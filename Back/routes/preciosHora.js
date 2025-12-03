import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/precios_hora", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT modulo, costo_hora 
      FROM precios_hora
      ORDER BY modulo ASC
    `);

    const mapped = {};
    result.rows.forEach(r => {
      mapped[r.modulo] = Number(r.costo_hora);
    });

    res.json(mapped);
  } catch (err) {
    console.error("Error cargando precios_hora:", err);
    res.status(500).json({ error: "Error cargando los precios por hora" });
  }
});

router.put("/precios_hora/:modulo", async (req, res) => {
  const modulo = req.params.modulo;
  const { costo_hora } = req.body;

  if (costo_hora == null || isNaN(Number(costo_hora))) {
    return res.status(400).json({ error: "costo_hora inválido" });
  }

  try {
    const exists = await pool.query(
      `SELECT * FROM precios_hora WHERE modulo = $1`,
      [modulo]
    );

    if (exists.rows.length === 0) {
      await pool.query(
        `INSERT INTO precios_hora (modulo, costo_hora)
         VALUES ($1, $2)`,
        [modulo, Number(costo_hora)]
      );
    } else {
      await pool.query(
        `UPDATE precios_hora 
         SET costo_hora = $1, fecha_actualizacion = NOW()
         WHERE modulo = $2`,
        [Number(costo_hora), modulo]
      );
    }

    res.json({ ok: true, modulo, costo_hora });
  } catch (err) {
    console.error("Error actualizando precios_hora:", err);
    res.status(500).json({ error: "Error actualizando el precio por hora" });
  }
});

export default router;
