import dotenv from "dotenv";
dotenv.config();

import pool from "./db.js";

async function fixUrls() {
  try {
    console.log("🔧 Corrigiendo URLs de fotos en producción...");

    // Limpiar URLs completas, dejando solo el nombre del archivo
    const result = await pool.query(`
      UPDATE usuarios
      SET foto = SUBSTRING_INDEX(foto, '/', -1)
      WHERE foto IS NOT NULL 
        AND foto != ''
        AND (foto LIKE 'http%' OR foto LIKE '/content/%')
    `);

    console.log(`✅ ${result.rowCount} URLs corregidas`);

    const { rows } = await pool.query(`
      SELECT id_usuario, usuario, foto FROM usuarios WHERE foto IS NOT NULL AND foto != '' LIMIT 5
    `);

    console.log("📸 Fotos actuales:");
    rows.forEach(row => {
      console.log(`  - ${row.usuario}: ${row.foto}`);
    });

    console.log("✨ Listo!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

fixUrls();