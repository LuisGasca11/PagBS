import dotenv from "dotenv";
dotenv.config();

import pool from "./db.js";

/**
 * Script para corregir URLs de producción
 * Ejecutar en producción: node fix_urls_production.js
 */

async function fixUrls() {
  try {
    console.log("🔧 Corrigiendo URLs de fotos en producción...");

    // Reemplazar localhost URLs con solo el nombre de archivo
    const result = await pool.query(`
      UPDATE usuarios
      SET foto = SUBSTRING(foto FROM POSITION('perfil-' IN foto))
      WHERE foto LIKE '%localhost%'
    `);

    console.log(`✅ ${result.rowCount} URLs corregidas`);

    // Verificar cambios
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
