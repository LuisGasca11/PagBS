import pool from "../db.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

/**
 * LISTAR DOCUMENTOS (usuarios logueados)
 */
export const getDocumentos = async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        d.id_documento,
        d.nombre,
        d.nombre_original,
        d.tamano,
        d.tipo_mime,
        d.fecha_creacion,
        u.usuario
      FROM documentos d
      JOIN usuarios u ON u.id_usuario = d.subido_por
      ORDER BY d.fecha_creacion DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("ERROR GET DOCUMENTOS:", err);
    res.status(500).json({ error: "Error obteniendo documentos" });
  }
};

/**
 * PREVIEW con autenticación (requiere token)
 */
export const previewDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      "SELECT * FROM documentos WHERE id_documento = $1",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const doc = rows[0];
    const filePath = path.join("uploads", "documentos", doc.ruta_archivo);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo no encontrado en disco" });
    }

    res.setHeader("Content-Type", doc.tipo_mime);
    res.setHeader("Content-Disposition", "inline");

    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error("ERROR PREVIEW:", err);
    res.status(500).json({ error: "Error mostrando documento" });
  }
};

/**
 * GENERAR URL DE PREVIEW PÚBLICO (token JWT temporal)
 */
export const generarPreviewPublico = async (req, res) => {
  try {
    const { id } = req.params;

    const previewSecret = process.env.DOC_PREVIEW_SECRET;
    
    let apiUrl;
    if (process.env.NODE_ENV === 'production') {
      apiUrl = 'https://blck-sheep.com';
    } else {
      apiUrl = process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 3019}`;
    }

    if (!previewSecret) {
      console.error("❌ DOC_PREVIEW_SECRET no está definido");
      return res.status(500).json({ 
        error: "Configuración incompleta del servidor" 
      });
    }

    const { rows } = await pool.query(
      "SELECT ruta_archivo, tipo_mime, nombre_original FROM documentos WHERE id_documento = $1",
      [id]
    );

    if (!rows.length) {
      console.error('❌ Documento no encontrado en BD');
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const token = jwt.sign(
      {
        id_documento: id,
        ruta: rows[0].ruta_archivo,
        mime: rows[0].tipo_mime,
      },
      previewSecret,
      { expiresIn: "1h" }
    );

    const finalUrl = `${apiUrl}/api/documentos/public/${token}`;

    res.json({
      url: finalUrl,
    });
  } catch (err) {
    console.error("❌ ERROR PREVIEW PUBLICO:", err);
    res.status(500).json({ error: "Error generando preview" });
  }
};

export const previewDocumentoPublico = async (req, res) => {
  try {
    const { token } = req.params;

    const previewSecret = process.env.DOC_PREVIEW_SECRET;

    if (!previewSecret) {
      console.error("❌ DOC_PREVIEW_SECRET no está definido");
      return res.status(500).json({ 
        error: "Configuración incompleta del servidor" 
      });
    }

    let payload;
    try {
      payload = jwt.verify(token, previewSecret);
    } catch (jwtErr) {
      console.error('❌ Error verificando token:', jwtErr.message);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    const filePath = path.join(process.cwd(), "uploads", "documentos", payload.ruta);

    const uploadsDir = path.join(process.cwd(), "uploads", "documentos");
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file}`);
        if (file === payload.ruta) {
          console.log(':)');
        }
      });
    } else {
      console.error('❌ La carpeta uploads/documentos NO EXISTE');
    }

    if (!fs.existsSync(filePath)) {
      console.error('❌ ARCHIVO NO ENCONTRADO:', filePath);
      console.log('=========================================================');
      return res.status(404).json({ 
        error: "Archivo no encontrado",
        debug: {
          buscado: payload.ruta,
          rutaCompleta: filePath,
          cwd: process.cwd()
        }
      });
    }

    const stats = fs.statSync(filePath);

    res.setHeader("Content-Type", payload.mime || "application/pdf");
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Cache-Control", "public, max-age=300");
    
    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error("❌ ERROR PREVIEW PÚBLICO:", err);
    console.log('=========================================================');
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const subirDocumento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Archivo requerido" });
    }

    const { originalname, mimetype, size, filename } = req.file;
    const usuarioId = req.user.id_usuario;

    const { rows } = await pool.query(
      `
      INSERT INTO documentos
      (nombre, nombre_original, ruta_archivo, tipo_mime, tamano, subido_por)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [originalname, originalname, filename, mimetype, size, usuarioId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("ERROR SUBIR DOCUMENTO:", err);
    res.status(500).json({ error: "Error subiendo documento" });
  }
};

/**
 * GENERAR URL DE DESCARGA (con JWT temporal)
 */
/**
 * GENERAR URL DE DESCARGA (con JWT temporal)
 */
export const generarUrlDescarga = async (req, res) => {
  try {
    const { id } = req.params;

    const previewSecret = process.env.DOC_PREVIEW_SECRET;
    
    // 🔥 MISMO PATRÓN QUE EL PREVIEW
    let apiUrl;
    if (process.env.NODE_ENV === 'production') {
      apiUrl = 'https://blck-sheep.com';
    } else {
      apiUrl = process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 3019}`;
    }

    console.log('📥 Generando URL de descarga');
    console.log('🌐 API URL:', apiUrl);

    if (!previewSecret) {
      return res
        .status(500)
        .json({ error: "Configuración incompleta del servidor" });
    }

    const { rows } = await pool.query(
      "SELECT ruta_archivo, nombre_original FROM documentos WHERE id_documento = $1",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const token = jwt.sign(
      {
        id_documento: id,
        ruta: rows[0].ruta_archivo,
        nombre: rows[0].nombre_original,
      },
      previewSecret,
      { expiresIn: "1h" } // 🔥 Aumentar de 5m a 1h
    );

    const finalUrl = `${apiUrl}/api/documentos/download/${token}`;
    console.log('🎯 URL de descarga generada:', finalUrl);

    res.json({
      url: finalUrl,
    });
  } catch (err) {
    console.error("❌ ERROR GENERAR URL DESCARGA:", err);
    res.status(500).json({ error: "Error generando URL de descarga" });
  }
};


/**
 * DESCARGAR DOCUMENTO (con JWT en URL)
 */
/**
 * DESCARGAR DOCUMENTO (con JWT en URL)
 */
export const descargarDocumento = async (req, res) => {
  try {
    const { token } = req.params;

    console.log('📥 Solicitud de descarga recibida');
    console.log('🔐 Token (primeros 30 chars):', token.substring(0, 30) + '...');

    const previewSecret = process.env.DOC_PREVIEW_SECRET;

    if (!previewSecret) {
      console.error('❌ DOC_PREVIEW_SECRET no configurado');
      return res
        .status(500)
        .json({ error: "Configuración incompleta del servidor" });
    }

    let payload;
    try {
      payload = jwt.verify(token, previewSecret);
      console.log('✅ Token válido');
      console.log('📄 Documento:', payload.nombre);
    } catch (jwtErr) {
      console.error('❌ Error verificando token:', jwtErr.message);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // 🔥 USAR process.cwd() IGUAL QUE EN EL PREVIEW
    const filePath = path.join(
      process.cwd(),
      "uploads",
      "documentos",
      payload.ruta
    );

    console.log('🔍 Buscando archivo en:', filePath);

    if (!fs.existsSync(filePath)) {
      console.error('❌ Archivo no encontrado');
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const stats = fs.statSync(filePath);
    console.log('✅ Archivo encontrado, tamaño:', (stats.size / 1024).toFixed(2), 'KB');
    console.log('📤 Iniciando descarga...');

    res.download(filePath, payload.nombre, (err) => {
      if (err) {
        console.error('❌ Error durante la descarga:', err);
      } else {
        console.log('✅ Descarga completada');
      }
    });
  } catch (err) {
    console.error("❌ ERROR DESCARGAR DOCUMENTO:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno del servidor" });
  }
};


/**
 * ELIMINAR DOCUMENTO (solo admin)
 */
export const eliminarDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      "SELECT ruta_archivo FROM documentos WHERE id_documento = $1",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const filePath = path.join("uploads", "documentos", rows[0].ruta_archivo);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pool.query("DELETE FROM documentos WHERE id_documento = $1", [id]);

    res.json({ success: true });
  } catch (err) {
    console.error("ERROR ELIMINAR DOCUMENTO:", err);
    res.status(500).json({ error: "Error eliminando documento" });
  }
};
