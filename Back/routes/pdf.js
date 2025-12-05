import express from "express";
import multer from "multer";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const logoFile = req.file || null;

    const companyData = {
      razonSocial: req.body.razonSocial,
      representanteLegal: req.body.representanteLegal,
      email: req.body.email,
    };

    const moduleSelections = JSON.parse(req.body.moduleSelections);
    const totals = JSON.parse(req.body.totals);
    const paymentFrequency = req.body.paymentFrequency;
    const userCount = parseInt(req.body.userCount);

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    // Función para encabezado y pie
    const drawHeaderFooter = async (page) => {
      page.drawRectangle({
        x: 0,
        y: 790,
        width: 595,
        height: 50,
        color: rgb(0.96, 0.62, 0.09),
      });

      if (logoFile) {
        let img;
        if (logoFile.mimetype.includes("png")) {
          img = await pdf.embedPng(logoFile.buffer);
        } else {
          img = await pdf.embedJpg(logoFile.buffer);
        }

        const scaled = img.scale(0.25);

        page.drawImage(img, {
          x: 20,
          y: 798,
          width: scaled.width,
          height: scaled.height,
        });
      }

      page.drawRectangle({
        x: 0,
        y: 0,
        width: 595,
        height: 40,
        color: rgb(0.12, 0.15, 0.18),
      });

      page.drawText("black_sheep | Cotización Microsip", {
        x: 20,
        y: 14,
        size: 12,
        font,
        color: rgb(1, 1, 1),
      });
    };

    // === Página 1 ===
    let page1 = pdf.addPage([595, 842]);
    await drawHeaderFooter(page1);

    let y = 720;
    page1.drawText("COTIZACIÓN MICROSIP", { x: 90, y, size: 32, font });

    y -= 50;
    page1.drawText(`Razón Social: ${companyData.razonSocial}`, { x: 90, y, size: 16, font });

    y -= 28;
    page1.drawText(`Representante Legal: ${companyData.representanteLegal}`, { x: 90, y, size: 16, font });

    y -= 28;
    page1.drawText(`Correo Electrónico: ${companyData.email}`, { x: 90, y, size: 16, font });

    // === Página 2 ===
    let page2 = pdf.addPage([595, 842]);
    await drawHeaderFooter(page2);

    y = 760;
    page2.drawText("MÓDULOS SELECCIONADOS", { x: 60, y, size: 26, font });

    y -= 40;
    page2.drawText("Módulo | Plan | Precio MXN", { x: 60, y, size: 14, font });

    y -= 20;

    Object.entries(moduleSelections).forEach(([mod, sel]) => {
      page2.drawText(
        `${mod} - ${sel.plan.toUpperCase()} - $${sel.price.toLocaleString("es-MX")}`,
        { x: 60, y, size: 13, font }
      );
      y -= 20;
    });

    // === Página 3 ===
    let page3 = pdf.addPage([595, 842]);
    await drawHeaderFooter(page3);

    y = 760;
    page3.drawText("RESUMEN DE COSTOS", { x: 60, y, size: 26, font });

    y -= 40;
    page3.drawText(`Subtotal módulos: $${totals.subtotalModulos.toLocaleString("es-MX")}`, { x: 60, y, size: 14, font });

    y -= 20;
    page3.drawText(`Descuento aplicado: $${totals.discountAmount.toLocaleString("es-MX")}`, { x: 60, y, size: 14, font });

    y -= 20;
    page3.drawText(`Total MXN: $${totals.totalMXN.toLocaleString("es-MX")}`, { x: 60, y, size: 14, font });

    y -= 20;
    page3.drawText(`Usuarios en la nube (${userCount}): $${totals.totalUSD}`, { x: 60, y, size: 14, font });

    // === Página 4 ===
    let page4 = pdf.addPage([595, 842]);
    await drawHeaderFooter(page4);

    y = 760;
    page4.drawText("PRÓXIMOS PASOS", { x: 60, y, size: 26, font });

    const steps = [
      "1. Revisión de cotización",
      "2. Confirmación de módulos",
      "3. Firma de contrato",
      "4. Implementación",
      "5. Soporte continuo",
    ];

    y -= 40;
    steps.forEach((s) => {
      page4.drawText(s, { x: 80, y, size: 14, font });
      y -= 26;
    });

    const pdfBytes = await pdf.save();

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al generar PDF" });
  }
});

export default router;
