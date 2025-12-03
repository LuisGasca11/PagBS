import express from "express";
import pool from "../db.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/precios", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.titulo            AS modulo_titulo,
        p.titulo            AS plan_titulo,
        pm.costo,
        p.plan_id
      FROM precios_modulo pm
      JOIN modulos m ON m.modulo_id = pm.modulo_id
      JOIN planes p ON p.plan_id = pm.plan_id
      ORDER BY m.titulo, p.plan_id;
    `);

    const formatted = {};

    for (const row of result.rows) {
      const modulo = row.modulo_titulo.trim();
      const planKey = row.plan_titulo.toLowerCase(); 

      if (!formatted[modulo]) formatted[modulo] = {};

      formatted[modulo][planKey] = {
        costo: Number(row.costo),
        plan_id: row.plan_id
      };
    }

    res.json(formatted);

  } catch (error) {
    console.error("Error cargando precios:", error);
    res.status(500).json({ message: "Error cargando precios" });
  }
});

router.put("/precios/:modulo/:plan_key", authRequired, async (req, res) => {
  const { modulo, plan_key } = req.params;
  const { costo } = req.body;

  if (isNaN(costo)) {
    return res.status(400).json({ message: "Costo inválido" });
  }

  try {
    const ids = await pool.query(
      `
      SELECT m.modulo_id, p.plan_id
      FROM modulos m
      JOIN planes p ON LOWER(p.titulo) = LOWER($2)
      WHERE LOWER(m.titulo) = LOWER($1)
      LIMIT 1
      `,
      [modulo, plan_key]
    );

    if (ids.rows.length === 0) {
      return res.status(404).json({ message: "Módulo o plan no encontrado" });
    }

    const { modulo_id, plan_id } = ids.rows[0];

    await pool.query(
      `
      UPDATE precios_modulo
      SET costo = $1, fecha_actualizacion = NOW()
      WHERE modulo_id = $2 AND plan_id = $3
      `,
      [costo, modulo_id, plan_id]
    );

    res.json({ message: "Costo actualizado correctamente" });

  } catch (error) {
    console.error("Error actualizando precio:", error);
    res.status(500).json({ message: "Error al actualizar precio" });
  }
});


export default router;
