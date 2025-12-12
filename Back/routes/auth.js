import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db.js";
import dotenv from "dotenv";
import { authRequired, adminOnly } from "../middleware/auth.js";

dotenv.config();
const router = express.Router();


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND activo = true",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("VALID PASSWORD?", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        usuario: user.usuario,
        rol: user.rol,
      },
      process.env.JWT_SECRET || "jajones",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id_usuario: user.id_usuario,
        usuario: user.usuario,
        rol: user.rol,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en servidor" });
  }
});


// VERIFY TOKEN
router.get("/verify", authRequired, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

export default router;
