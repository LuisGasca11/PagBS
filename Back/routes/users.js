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

// 🔍 DEBUG: Ver qué fotos hay en BD
router.get("/debug/fotos", async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT id_usuario, usuario, foto FROM usuarios WHERE foto IS NOT NULL AND foto != ''
  `);
  console.log("📸 Fotos encontradas:", rows);
  res.json(rows);
});

// GET: Listar usuarios - NO modificar las URLs aquí
router.get("/", authRequired, adminOnly, async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT id_usuario, usuario, rol, activo, nombre, correo, foto, fecha_creacion
    FROM usuarios
    ORDER BY id_usuario
  `);
  res.json(rows);
});

// POST: Subir foto de perfil para usuario existente
router.post(
  "/:id/upload-foto",
  authRequired,
  upload.single("foto"),
  async (req, res) => {
    try {
      const targetUserId = Number(req.params.id);

      // Seguridad: admin o el mismo usuario
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

      // Eliminar foto anterior si existe
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

      // Guardar solo el nombre del archivo en BD
      await pool.query(
        `UPDATE usuarios
         SET foto = $1, fecha_actualizacion = now()
         WHERE id_usuario = $2`,
        [req.file.filename, targetUserId]
      );

      console.log("✅ Foto actualizada en BD:", req.file.filename);

      res.json({ ok: true, foto: `/api/usuarios/${targetUserId}/photo` });
    } catch (err) {
      console.error("❌ UPLOAD FOTO ERROR:", err);
      res.status(500).json({ error: "Error al subir la foto" });
    }
  }
);

// POST: Crear nuevo usuario
router.post("/", authRequired, adminOnly, async (req, res) => {
  try {
    const { usuario, password, rol = "user", activo = true, nombre, correo, foto } = req.body;

    const hash = await bcrypt.hash(password, 10);

    let fotoFilename = null;
    
    // Procesar foto base64 si viene
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
        
        fotoFilename = filename;
        
        console.log("✅ Foto guardada (base64):", fotoFilename);
      } catch (err) {
        console.error("❌ Error al procesar base64:", err);
      }
    }

    await pool.query(
      `INSERT INTO usuarios (usuario, password_hash, rol, activo, nombre, correo, foto)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [usuario, hash, rol, activo, nombre, correo, fotoFilename]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// PUT: Actualizar usuario
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

// DELETE: Eliminar usuario
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

// GET: Servir foto de usuario específico (SIN autenticación para que <img> funcione)
router.get("/:id/photo", async (req, res) => {
  try {
    console.log(`📸 Solicitando foto para usuario ${req.params.id}`);
    
    const { rows } = await pool.query(
      "SELECT foto FROM usuarios WHERE id_usuario = $1",
      [req.params.id]
    );

    if (!rows.length) {
      console.log(`❌ Usuario no encontrado: ${req.params.id}`);
      return res.status(404).send("Usuario no encontrado");
    }

    const fotoFilename = rows[0]?.foto;
    
    if (!fotoFilename) {
      console.log(`⚠️ Usuario sin foto: ${req.params.id}`);
      return res.status(404).send("Usuario no tiene foto");
    }

    console.log(`🔗 Foto en BD: ${fotoFilename}`);

    // El filename en BD debe ser solo el nombre del archivo
    const filePath = path.join(process.cwd(), uploadDir, fotoFilename);
    console.log(`🔍 Ruta completa: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ Archivo no existe en disco`);
      return res.status(404).send("Archivo no encontrado");
    }

    console.log(`✅ Sirviendo foto: ${fotoFilename}`);
    
    const ext = path.extname(fotoFilename).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    const contentType = mimeTypes[ext] || 'image/jpeg';

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Content-Type", contentType);
    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error("❌ ERROR GET PHOTO:", err);
    res.status(500).send("Error al obtener foto");
  }
});

export default router;