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

    // 🔥 LOGS DETALLADOS
    console.log('==================== GENERAR PREVIEW ====================');
    console.log('📝 ID del documento:', id);
    console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
    console.log('📡 API_PUBLIC_URL del .env:', process.env.API_PUBLIC_URL);
    console.log('🔢 PORT:', process.env.PORT);

    const previewSecret = process.env.DOC_PREVIEW_SECRET;
    
    // Determinar la URL base
    let apiUrl;
    if (process.env.NODE_ENV === 'production') {
      apiUrl = 'https://blck-sheep.com';
      console.log('✅ Modo PRODUCCIÓN - usando:', apiUrl);
    } else {
      apiUrl = process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 3019}`;
      console.log('🔧 Modo DESARROLLO - usando:', apiUrl);
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

    console.log('📄 Documento encontrado:', rows[0].nombre_original);
    console.log('📂 Ruta en BD:', rows[0].ruta_archivo);

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
    console.log('🎯 URL FINAL GENERADA:', finalUrl);
    console.log('=========================================================');

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

    console.log('==================== PREVIEW PÚBLICO ====================');
    console.log('🔐 Token recibido (primeros 50 chars):', token.substring(0, 50) + '...');

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
      console.log('✅ Token válido');
      console.log('📄 ID documento:', payload.id_documento);
      console.log('📂 Ruta del archivo:', payload.ruta);
      console.log('📋 MIME type:', payload.mime);
    } catch (jwtErr) {
      console.error('❌ Error verificando token:', jwtErr.message);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // Construir ruta completa
    const filePath = path.join(process.cwd(), "uploads", "documentos", payload.ruta);
    console.log('🔍 Working directory:', process.cwd());
    console.log('🔍 Ruta completa del archivo:', filePath);
    console.log('📁 ¿Existe el archivo?', fs.existsSync(filePath));

    // Listar archivos en la carpeta
    const uploadsDir = path.join(process.cwd(), "uploads", "documentos");
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      console.log('📁 Archivos en uploads/documentos (' + files.length + ' archivos):');
      files.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file}`);
        if (file === payload.ruta) {
          console.log('     ⬆️  ¡ESTE ES EL QUE BUSCAMOS!');
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
    console.log('✅ Archivo encontrado');
    console.log('📊 Tamaño:', (stats.size / 1024).toFixed(2), 'KB');

    // Headers para CORS e iframe
    res.setHeader("Content-Type", payload.mime || "application/pdf");
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Cache-Control", "public, max-age=300");

    console.log('📤 Enviando archivo al cliente...');
    console.log('=========================================================');
    
    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error("❌ ERROR PREVIEW PÚBLICO:", err);
    console.log('=========================================================');
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * SUBIR DOCUMENTO (solo admin)
 */
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
export const generarUrlDescarga = async (req, res) => {
  try {
    const { id } = req.params;

    const previewSecret = process.env.DOC_PREVIEW_SECRET;
    const apiUrl =
      process.env.API_PUBLIC_URL ||
      `http://localhost:${process.env.PORT || 3019}`;

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
      { expiresIn: "5m" }
    );

    res.json({
      url: `${apiUrl}/api/documentos/download/${token}`,
    });
  } catch (err) {
    console.error("❌ ERROR GENERAR URL DESCARGA:", err);
    res.status(500).json({ error: "Error generando URL de descarga" });
  }
};


/**
 * DESCARGAR DOCUMENTO (con JWT en URL)
 */
export const descargarDocumento = async (req, res) => {
  try {
    const { token } = req.params;

    const previewSecret = process.env.DOC_PREVIEW_SECRET;

    if (!previewSecret) {
      return res
        .status(500)
        .json({ error: "Configuración incompleta del servidor" });
    }

    const payload = jwt.verify(token, previewSecret);

    const filePath = path.join(
      "uploads",
      "documentos",
      payload.ruta
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }
    res.download(filePath, payload.nombre);
  } catch (err) {
    console.error("❌ ERROR DESCARGAR DOCUMENTO:", err.message);
    return res
      .status(401)
      .json({ error: "Token inválido o expirado" });
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
