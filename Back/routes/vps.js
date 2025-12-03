import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vps_planes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error cargando los planes VPS" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { precio_mensual_local, precio_mensual_nube } = req.body;

  try {
    const current = await pool.query(
      "SELECT precio_mensual_local, precio_mensual_nube FROM vps_planes WHERE id = $1",
      [id]
    );

    if (current.rows.length === 0) {
      return res.status(404).json({ error: "VPS no encontrado" });
    }

    const normalize = (value, currentValue) => {
      if (value === "" || value === null || value === undefined)
        return currentValue;
      const num = Number(value);
      return isNaN(num) ? currentValue : num;
    };

    const local = normalize(
      precio_mensual_local,
      current.rows[0].precio_mensual_local
    );

    const nube = normalize(
      precio_mensual_nube,
      current.rows[0].precio_mensual_nube
    );

    await pool.query(
      `
      UPDATE vps_planes
      SET precio_mensual_local = $1,
          precio_mensual_nube = $2
      WHERE id = $3
      `,
      [local, nube, id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando el VPS" });
  }
});

export default router;
