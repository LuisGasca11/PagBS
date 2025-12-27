import PptxGenJS from "pptxgenjs";

const theme = {
  primary: "F97316",
  dark: "1F2937",
  gray: "6B7280",
};

const font = {
  title: { fontFace: "Montserrat", fontSize: 30, bold: true },
  section: { fontFace: "Montserrat", fontSize: 20, bold: true },
  body: { fontFace: "Montserrat", fontSize: 13 },
};

const layout = { x: 0.7, w: 8.6 };

export async function generarPropuestaPPTX(data) {
  const pptx = new PptxGenJS();

  /* ======================
     SLIDE 1 - PORTADA
  ====================== */
  const s1 = pptx.addSlide();
  s1.addText(data.titulo, { x: layout.x, y: 1.2, ...font.title, color: theme.primary });
  s1.addText(data.fecha, { x: layout.x, y: 2.2, fontSize: 14, color: theme.gray });
  s1.addImage({ data: data.logoBase64, x: 6.3, y: 0.6, w: 3 });

  /* ======================
     SLIDE 2 - QUIÉNES SOMOS
  ====================== */
  const s2 = pptx.addSlide();
  s2.addText("¿QUIÉNES SOMOS?", { x: layout.x, y: 0.6, ...font.section });
  s2.addText(
    "Somos expertos en soluciones Microsip con más de 15 años de experiencia...",
    { x: layout.x, y: 1.4, ...font.body, w: layout.w }
  );

  /* ======================
     SLIDE 3 - CONTEXTO
  ====================== */
  const s3 = pptx.addSlide();
  s3.addText("CONTEXTO", { x: layout.x, y: 0.6, ...font.section });
  s3.addText(data.contexto, { x: layout.x, y: 1.4, ...font.body, w: layout.w });
  s3.addText("OBJETIVO", { x: layout.x, y: 3.6, ...font.section });
  s3.addText(data.objetivo, { x: layout.x, y: 4.2, ...font.body, w: layout.w });

  /* ======================
     SLIDE 4 - DIAGNÓSTICO
  ====================== */
  const s4 = pptx.addSlide();
  s4.addText("DIAGNÓSTICO", { x: layout.x, y: 0.6, ...font.section });
  s4.addText(data.diagnostico.join("\n"), { x: layout.x, y: 1.4, ...font.body, w: layout.w });
  s4.addText("RESULTADO ESPERADO", { x: layout.x, y: 3.6, ...font.section });
  s4.addText(data.resultado, { x: layout.x, y: 4.2, ...font.body, w: layout.w });

  /* ======================
     SLIDE 7 - MÓDULOS (TABLA)
  ====================== */
  const s7 = pptx.addSlide();
  s7.addText("MÓDULOS SELECCIONADOS", { x: layout.x, y: 0.6, ...font.section });

  s7.addTable(
    [
      [
        { text: "Módulo", options: { bold: true } },
        { text: "Cantidad", options: { bold: true } },
        { text: "Precio Unitario", options: { bold: true } },
        { text: "Total", options: { bold: true } },
      ],
      ...data.modulos.map((m) => [
        m.nombre,
        String(m.cantidad),
        `$${m.precio}`,
        `$${m.total}`,
      ]),
    ],
    { x: layout.x, y: 1.4, w: layout.w }
  );

  /* ======================
     SLIDE 8 - SERVICIOS / VPS
  ====================== */
  const s8 = pptx.addSlide();
  s8.addText("SERVICIOS Y USUARIOS", { x: layout.x, y: 0.6, ...font.section });

  s8.addTable(
    [
      [
        { text: "Servicio", options: { bold: true } },
        { text: "Usuarios", options: { bold: true } },
        { text: "Precio", options: { bold: true } },
        { text: "Total", options: { bold: true } },
      ],
      ...data.servicios.map((s) => [
        s.nombre,
        String(s.usuarios),
        `$${s.precio}`,
        `$${s.total}`,
      ]),
    ],
    { x: layout.x, y: 1.4, w: layout.w }
  );

  const s9 = pptx.addSlide();
  s9.addText("IMPLEMENTACIÓN / HORAS", { x: layout.x, y: 0.6, ...font.section });

  s9.addTable(
    [
      [
        { text: "Concepto", options: { bold: true } },
        { text: "Horas", options: { bold: true } },
        { text: "Precio Hora", options: { bold: true } },
        { text: "Total", options: { bold: true } },
      ],
      ...data.implementacion.map((i) => [
        i.concepto,
        String(i.horas),
        `$${i.precio}`,
        `$${i.total}`,
      ]),
    ],
    { x: layout.x, y: 1.4, w: layout.w }
  );

  const s10 = pptx.addSlide();
  s10.addText("RESUMEN ECONÓMICO", { x: layout.x, y: 1.2, ...font.section });
  s10.addText(`Subtotal (${data.frecuencia}): $${data.subtotal}`, {
    x: layout.x,
    y: 2.6,
    fontSize: 16,
  });
  s10.addText(`TOTAL: $${data.total}`, {
    x: layout.x,
    y: 3.4,
    fontSize: 22,
    bold: true,
    color: theme.primary,
  });

  await pptx.writeFile({ fileName: "Propuesta_Comercial_2025.pptx" });
}
