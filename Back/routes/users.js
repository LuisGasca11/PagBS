import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import { authRequired, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, adminOnly, async (req, res) => {
  const { rows } = await pool.query(`
    SELECT id_usuario, usuario, rol, activo, fecha_creacion
    FROM usuarios
    ORDER BY id_usuario
  `);
  res.json(rows);
});

router.post("/", authRequired, adminOnly, async (req, res) => {
  const { usuario, password, rol = "user" } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO usuarios (usuario, password_hash, rol)
     VALUES ($1, $2, $3)`,
    [usuario, hash, rol]
  );

  res.json({ ok: true });
});

router.put("/:id", authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { usuario, password, activo, rol } = req.body;

  const values = [usuario, activo, rol];
  let query = `
    UPDATE usuarios
    SET usuario = $1,
        activo = $2,
        rol = $3,
        fecha_actualizacion = now()
  `;

  if (password) {
    const hash = await bcrypt.hash(password, 10);
    query += `, password_hash = $4 WHERE id_usuario = $5`;
    values.push(hash, id);
  } else {
    query += ` WHERE id_usuario = $4`;
    values.push(id);
  }

  await pool.query(query, values);
  res.json({ ok: true });
});

router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  if (Number(req.params.id) === req.user.id_usuario) {
    return res.status(400).json({
      message: "No puedes borrar tu propio usuario",
    });
  }

  await pool.query(
    "DELETE FROM usuarios WHERE id_usuario = $1",
    [req.params.id]
  );

  res.json({ ok: true });
});

export default router;
