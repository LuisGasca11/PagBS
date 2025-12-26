import express from "express";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

function findImageByAltText(zip, searchText) {
  const slideFiles = zip.file(/ppt\/slides\/slide\d+\.xml/);
  let targetImageRid = null;
  let targetSlideFile = null;

  for (const file of slideFiles) {
    // Usamos .asText() en lugar de .async("string")
    const content = file.asText(); 
    
    if (content.includes(searchText)) {
      // Buscamos el r:id de la imagen que tiene ese texto alternativo (descr)
      const match = content.match(new RegExp(`<p:nvPicPr>.*?descr="${searchText}".*?<a:blip r:embed="(rId\\d+)"`, 's'));
      if (match) {
        targetImageRid = match[1];
        targetSlideFile = file.name;
        break;
      }
    }
  }

  if (!targetImageRid || !targetSlideFile) return null;

  // Buscamos en el archivo .rels de esa slide para ver a qué archivo de media apunta
  const relsPath = targetSlideFile.replace("slides/", "slides/_rels/") + ".rels";
  const relsFile = zip.file(relsPath);
  
  if (!relsFile) return null;

  const relsContent = relsFile.asText();
  const relMatch = relsContent.match(new RegExp(`Id="${targetImageRid}".*?Target="../media/(.*?)"`));

  return relMatch ? `ppt/media/${relMatch[1]}` : null;
}

function getBase64Data(base64String) {
  if (!base64String) return null;
  return base64String.replace(/^data:image\/\w+;base64,/, "");
}

router.post("/presentation", async (req, res) => {
  try {
    const {
      titulo, fecha, contexto, objetivo, diagnostico, resultado,
      modulos, servicios, implementacion,
      subtotal_modulos, subtotal_vps,
      subtotal_sin_iva, iva_monto, total_con_iva,
      frecuencia, logoBase64, nota_iva
    } = req.body;

    const templatePath = path.resolve(
      __dirname,
      "..",
      "public",
      "templates",
      "PROPUESTA-COMERCIAL_2025.pptx"
    );

    const outputDir = path.resolve(__dirname, "..", "public", "generated");

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ error: "Template no encontrado" });
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const extractNumber = (value) => {
      if (!value) return 0;
      const num = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const formatCurrency = (value) =>
      `$${extractNumber(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    const modulosData = Array.isArray(modulos)
      ? modulos.map(m => ({
        nombre: m.nombre || "Módulo",
        cantidad: String(m.cantidad || 1),
        precio: formatCurrency(m.precio),
        total: formatCurrency(m.total)
      }))
      : [];

    const serviciosData = Array.isArray(servicios)
      ? servicios.map(s => ({
        nombre: s.nombre || "Servicio",
        usuarios: String(s.usuarios || 1),
        precio: formatCurrency(s.precio),
        total: formatCurrency(s.total)
      }))
      : [];

    const implementacionData = Array.isArray(implementacion)
      ? implementacion.map(i => ({
        concepto: i.concepto || "Servicio",
        horas: String(i.horas || 0),
        precio: formatCurrency(i.precio),
        total: formatCurrency(i.total)
      }))
      : [];

    const diagnosticoData = Array.isArray(diagnostico)
      ? diagnostico.map(d => d.startsWith("•") ? d : `• ${d}`)
      : [];

    const subtotalSinIVA =
      extractNumber(subtotal_sin_iva) ||
      extractNumber(subtotal_modulos) +
      extractNumber(subtotal_vps) +
      implementacionData.reduce((s, i) => s + extractNumber(i.total), 0);

    const iva = extractNumber(iva_monto) || subtotalSinIVA * 0.16;
    const total = extractNumber(total_con_iva) || subtotalSinIVA + iva;

    const data = {
      titulo: titulo || "Propuesta Comercial Microsip 2025",
      fecha: fecha || new Date().toLocaleDateString("es-MX"),
      contexto,
      objetivo,
      diagnostico: diagnosticoData,
      resultado,
      modulos: modulosData,
      servicios: serviciosData,
      implementacion: implementacionData,

      subtotal_modulos: formatCurrency(subtotal_modulos),
      subtotal_vps: formatCurrency(subtotal_vps),
      subtotal_sin_iva: formatCurrency(subtotalSinIVA),
      iva_monto: formatCurrency(iva),
      total_con_iva: formatCurrency(total),

      subtotal: formatCurrency(subtotalSinIVA),
      total: formatCurrency(total),

      frecuencia: (frecuencia || "Mensual").toUpperCase(),
      nota_iva: nota_iva || "* Al precio final se le agrega el 16% de IVA."
    };

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{", end: "}" }
    });

    doc.render(data);

    if (logoBase64) {
      try {
        const logoData = getBase64Data(logoBase64);
        const imgBuffer = Buffer.from(logoData, "base64");

        const targetPath = findImageByAltText(zip, "LOGO_CLIENTE");

        if (targetPath) {
          zip.file(targetPath, imgBuffer);
          console.log(`✅ Logo reemplazado dinámicamente en: ${targetPath}`);
        } else {
          const fallback = zip.file(/ppt\/media\/image1\./)[0];
          if (fallback) {
            zip.file(fallback.name, imgBuffer);
            console.log("⚠️ No se encontró Alt Text, usando fallback image1");
          }
        }
      } catch (imgErr) {
        console.error("❌ Error en reemplazo dinámico:", imgErr);
      }
    }


    const buffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE"
    });

    const fileName = `propuesta-${Date.now()}.pptx`;
    const finalPath = path.join(outputDir, fileName);

    fs.writeFileSync(finalPath, buffer);

    res.json({
      success: true,
      url: `/generated/${fileName}`,
      fileName,
      hasLogo: !!logoBase64
    });

  } catch (err) {
    console.error("❌ Error generando PPTX:", err);
    res.status(500).json({
      error: "Error al generar presentación",
      message: err.message
    });
  }
});

export default router;
