import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import pool from "../db.js";
import { authRequired, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const uploadDir = "uploads/perfiles";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `perfil-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Solo se permiten imágenes"));
  },
});

function getPublicUrl(filename) {
  const baseUrl = process.env.API_PUBLIC_URL || "https://blck-sheep.com";
  return `${baseUrl}/content/perfiles/${filename}`;
}

// 🔍 DEBUG: Ver qué fotos hay en BD (SIN autenticación para testing)
router.get("/debug/fotos", async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT id_usuario, usuario, foto FROM usuarios WHERE foto IS NOT NULL AND foto != ''
  `);
  console.log("📸 Fotos encontradas:", rows);
  res.json(rows);
});

router.get("/", authRequired, adminOnly, async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT id_usuario, usuario, rol, activo, nombre, correo, 
           COALESCE(REPLACE(foto, '/uploads/', '/content/'), '') AS foto, 
           fecha_creacion
    FROM usuarios
    ORDER BY id_usuario
  `);
  res.json(rows);
});

router.post(
  "/:id/upload-foto",
  authRequired,
  upload.single("foto"),
  async (req, res) => {
    try {
      const targetUserId = Number(req.params.id);

      // seguridad:
      if (
        req.user.rol !== "admin" &&
        targetUserId !== req.user.id_usuario
      ) {
        return res.status(403).json({ error: "No autorizado" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No se proporcionó imagen" });
      }

      console.log("📸 Archivo recibido:", req.file.filename);

      const { rows } = await pool.query(
        "SELECT foto FROM usuarios WHERE id_usuario = $1",
        [targetUserId]
      );

      if (rows[0]?.foto) {
        const oldFilename = path.basename(rows[0].foto);
        const oldPath = path.join(process.cwd(), uploadDir, oldFilename);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("🗑️ Foto anterior eliminada:", oldFilename);
        }
      }

      const fotoUrl = getPublicUrl(req.file.filename);

      await pool.query(
        `UPDATE usuarios
         SET foto = $1, fecha_actualizacion = now()
         WHERE id_usuario = $2`,
        [fotoUrl, targetUserId]
      );

      console.log("✅ Foto actualizada en BD:", fotoUrl);

      res.json({ ok: true, foto: fotoUrl });
    } catch (err) {
      console.error("❌ UPLOAD FOTO ERROR:", err);
      res.status(500).json({ error: "Error al subir la foto" });
    }
  }
);

router.post("/", authRequired, adminOnly, async (req, res) => {
  try {
    const { usuario, password, rol = "user", activo = true, nombre, correo, foto } = req.body;

    const hash = await bcrypt.hash(password, 10);

    let fotoUrl = null;
    
    if (foto && foto.startsWith('data:image')) {
      try {
        const matches = foto.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) throw new Error("Formato base64 inválido");

        const ext = matches[1]; 
        const base64Data = matches[2];
        
        const buffer = Buffer.from(base64Data, 'base64');
        
        const filename = `perfil-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        const filepath = path.join(uploadDir, filename);
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, buffer);
        
        fotoUrl = getPublicUrl(filename);
        
        console.log("✅ Foto guardada (base64):", fotoUrl);
      } catch (err) {
        console.error("❌ Error al procesar base64:", err);
      }
    } else if (foto) {
      fotoUrl = foto;
    }

    await pool.query(
      `INSERT INTO usuarios (usuario, password_hash, rol, activo, nombre, correo, foto)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [usuario, hash, rol, activo, nombre, correo, fotoUrl]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.put("/:id", authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { usuario, password, activo, rol, nombre, correo, foto } = req.body;

  const values = [usuario, activo, rol, nombre, correo, foto ?? null];
  let query = `
    UPDATE usuarios
    SET usuario = $1,
        activo = $2,
        rol = $3,
        nombre = $4,
        correo = $5,
        foto = COALESCE($6, foto),
        fecha_actualizacion = now()
  `;

  if (password) {
    const hash = await bcrypt.hash(password, 10);
    query += `, password_hash = $7 WHERE id_usuario = $8`;
    values.push(hash, id);
  } else {
    query += ` WHERE id_usuario = $7`;
    values.push(id);
  }

  await pool.query(query, values);
  res.json({ ok: true });
});

router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  if (Number(req.params.id) === req.user.id_usuario) {
    return res.status(400).json({ message: "No puedes borrar tu propio usuario" });
  }

  const { rows } = await pool.query(
    "SELECT foto FROM usuarios WHERE id_usuario = $1",
    [req.params.id]
  );

  if (rows[0]?.foto) {
    const filename = path.basename(rows[0].foto);
    const photoPath = path.join(process.cwd(), uploadDir, filename);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
      console.log("🗑️ Foto eliminada:", filename);
    }
  }

  await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [req.params.id]);
  res.json({ ok: true });
});

// 📸 SERVIR FOTOS VÍA API (evita bloqueos de adblocker)
router.get("/:id/photo", authRequired, async (req, res) => {
  try {
    console.log(`📸 Buscando foto para usuario ${req.params.id}`);
    
    const { rows } = await pool.query(
      "SELECT foto FROM usuarios WHERE id_usuario = $1",
      [req.params.id]
    );

    if (!rows.length) {
      console.log(`❌ Usuario no encontrado: ${req.params.id}`);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!rows[0]?.foto) {
      console.log(`⚠️ Usuario sin foto: ${req.params.id}`);
      return res.status(404).json({ error: "Usuario no tiene foto" });
    }

    const fotoUrl = rows[0].foto;
    console.log(`🔗 URL en BD: ${fotoUrl}`);

    // Si es una URL http/https completa, hacer proxy o redirect
    if (fotoUrl.startsWith('http')) {
      // En producción, ignorar URLs con localhost y servir el archivo
      if (fotoUrl.includes('localhost')) {
        const filename = path.basename(fotoUrl);
        const filePath = path.join(uploadDir, filename);
        
        console.log(`🔧 URL de localhost detectada, sirviendo desde disk: ${filePath}`);
        
        if (fs.existsSync(filePath)) {
          const ext = path.extname(filename).toLowerCase();
          const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
          };
          const contentType = mimeTypes[ext] || 'image/png';
          
          res.setHeader("Cache-Control", "public, max-age=86400");
          res.setHeader("Content-Type", contentType);
          return res.sendFile(path.resolve(filePath));
        }
      }
      
      // Para URLs externas, hacer redirect
      const filename = path.basename(fotoUrl);
      const filePath = path.join(uploadDir, filename);
      
      console.log(`🔗 URL externa: ${fotoUrl}`);
      
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp'
        };
        const contentType = mimeTypes[ext] || 'image/png';
        
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.setHeader("Content-Type", contentType);
        return res.sendFile(path.resolve(filePath));
      } else {
        return res.redirect(fotoUrl);
      }
    }

    // Si no es URL, asumir que es solo el nombre del archivo
    const filePath = path.join(uploadDir, fotoUrl);
    console.log(`🔍 Buscando: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ Archivo no existe: ${filePath}`);
      return res.status(404).json({ error: "Archivo no encontrado", path: filePath });
    }

    console.log(`✅ Sirviendo: ${fotoUrl}`);
    
    const ext = path.extname(fotoUrl).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    const contentType = mimeTypes[ext] || 'image/png';

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Content-Type", contentType);
    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error("❌ ERROR GET PHOTO:", err);
    res.status(500).json({ error: "Error al obtener foto", details: err.message });
  }
});

export default router;