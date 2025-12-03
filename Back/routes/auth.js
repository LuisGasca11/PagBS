import express from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import dotenv from "dotenv";
import { authRequired } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const sql = "SELECT * FROM usuarios WHERE usuario = $1";
    const result = await pool.query(sql, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = result.rows[0];

    if (user.password_hash !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user.id_usuario,
        username: user.usuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id_usuario,
        username: user.usuario
      }
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
    user: {
      id: req.user.id,
      username: req.user.username
    }
  });
});

export default router;
