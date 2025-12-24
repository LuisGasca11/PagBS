import express from "express";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import JSZip from "jszip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// 🔥 FUNCIÓN: Insertar imagen en PPTX existente
async function insertLogoIntoPPTX(pptxPath, logoBase64, outputPath) {
  try {
    console.log("📸 Insertando logo en PPTX existente...");
    
    // Leer el PPTX como ZIP
    const content = fs.readFileSync(pptxPath);
    const zip = await JSZip.loadAsync(content);
    
    // Convertir base64 a buffer
    const logoBuffer = Buffer.from(logoBase64, 'base64');
    
    // Determinar extensión de la imagen
    let extension = 'png';
    let contentType = 'image/png';
    
    // Detectar tipo de imagen
    const header = logoBase64.substring(0, 10);
    if (header.startsWith('/9j/')) {
      extension = 'jpeg';
      contentType = 'image/jpeg';
    } else if (header.startsWith('iVBOR')) {
      extension = 'png';
      contentType = 'image/png';
    }
    
    // Agregar la imagen al ZIP en la carpeta media
    const imageName = `logo_cliente.${extension}`;
    zip.file(`ppt/media/${imageName}`, logoBuffer);
    
    console.log(`✅ Imagen agregada: ppt/media/${imageName}`);
    
    // Obtener el slide1.xml (primera diapositiva)
    const slide1XML = await zip.file("ppt/slides/slide1.xml").async("string");
    
    // Necesitamos obtener el siguiente rId disponible
    const rIdMatches = slide1XML.match(/r:id="rId(\d+)"/g) || [];
    const rIds = rIdMatches.map(m => parseInt(m.match(/\d+/)[0]));
    const nextRId = Math.max(0, ...rIds) + 1;
    
    console.log(`📌 Usando rId${nextRId} para la imagen`);
    
    // Agregar relación en slide1.xml.rels
    const slide1RelsPath = "ppt/slides/_rels/slide1.xml.rels";
    let slide1Rels = await zip.file(slide1RelsPath).async("string");
    
    // Insertar la nueva relación antes del cierre de </Relationships>
    const newRel = `<Relationship Id="rId${nextRId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${imageName}"/>`;
    slide1Rels = slide1Rels.replace('</Relationships>', `${newRel}</Relationships>`);
    
    zip.file(slide1RelsPath, slide1Rels);
    console.log("✅ Relación agregada");
    
    // Agregar el elemento <p:pic> al slide1.xml
    // Posición: x=6.5", y=0.5", ancho=2.5", alto=1.8"
    // En EMUs: 1 pulgada = 914400 EMUs
    const x = Math.round(6.5 * 914400);
    const y = Math.round(0.5 * 914400);
    const cx = Math.round(2.5 * 914400);
    const cy = Math.round(1.8 * 914400);
    
    const picXML = `
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="99999" name="Logo Cliente"/>
          <p:cNvPicPr/>
          <p:nvPr/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="rId${nextRId}"/>
          <a:stretch>
            <a:fillRect/>
          </a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm>
            <a:off x="${x}" y="${y}"/>
            <a:ext cx="${cx}" cy="${cy}"/>
          </a:xfrm>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
        </p:spPr>
      </p:pic>`;
    
    // Insertar antes del cierre de </p:spTree>
    const modifiedSlide1 = slide1XML.replace('</p:spTree>', `${picXML}</p:spTree>`);
    zip.file("ppt/slides/slide1.xml", modifiedSlide1);
    
    console.log("✅ Elemento de imagen insertado en slide1.xml");
    
    // Actualizar [Content_Types].xml para incluir el tipo de imagen
    let contentTypes = await zip.file("[Content_Types].xml").async("string");
    
    if (!contentTypes.includes(`Extension="${extension}"`)) {
      const newDefault = `<Default Extension="${extension}" ContentType="${contentType}"/>`;
      contentTypes = contentTypes.replace('<Types ', `<Types>${newDefault}`);
      zip.file("[Content_Types].xml", contentTypes);
      console.log("✅ Content type actualizado");
    }
    
    // Guardar el ZIP modificado
    const newContent = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE"
    });
    
    fs.writeFileSync(outputPath, newContent);
    console.log("✅ PPTX con logo guardado");
    
    return true;
  } catch (err) {
    console.error("❌ Error insertando logo:", err);
    throw err;
  }
}

// 🔥 ENDPOINT PRINCIPAL
router.post("/presentation", async (req, res) => {
  try {
    const {
      titulo, fecha, contexto, objetivo, diagnostico, resultado,
      modulos, servicios, implementacion, subtotal, total, frecuencia,
      logoBase64
    } = req.body;

    console.log("📥 Generando presentación...", { 
      hasLogo: !!logoBase64,
      modulosCount: modulos?.length,
      serviciosCount: servicios?.length,
      implementacionCount: implementacion?.length
    });

    const templatePath = path.resolve(__dirname, "..", "public", "templates", "PROPUESTA-COMERCIAL_2025.pptx");
    const outputDir = path.resolve(__dirname, "..", "public", "generated");

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        error: "Template no encontrado",
        path: templatePath
      });
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 🔥 Preparar datos correctamente
    const modulosData = (modulos || []).map(m => ({
      nombre: m.nombre || "",
      cantidad: String(m.cantidad || 0),
      precio: m.precio || "$0.00",
      total: m.total || "$0.00"
    }));

    const serviciosData = (servicios || []).map(s => ({
      nombre: s.nombre || "",
      usuarios: String(s.usuarios || 0),
      precio: s.precio || "$0.00",
      total: s.total || "$0.00"
    }));

    const implementacionData = (implementacion || []).map(i => ({
      concepto: i.concepto || "",
      horas: String(i.horas || 0),
      precio: i.precio || "$0.00",
      total: i.total || "$0.00"
    }));

    const diagnosticoArray = Array.isArray(diagnostico)
      ? diagnostico.map(d => ({ texto: d }))
      : (diagnostico ? [{ texto: diagnostico }] : []);

    console.log("📊 Datos procesados:", {
      modulos: modulosData,
      servicios: serviciosData,
      implementacion: implementacionData
    });

    const data = {
      titulo: titulo || "Propuesta Comercial Microsip 2025",
      fecha: fecha || new Date().toLocaleDateString("es-MX"),
      contexto: contexto || "",
      objetivo: objetivo || "",
      diagnostico: diagnosticoArray,
      resultado: resultado || "",
      modulos: modulosData,
      servicios: serviciosData,
      implementacion: implementacionData,
      subtotal: subtotal || "$0.00",
      total: total || "$0.00",
      frecuencia: frecuencia || "Mensual"
    };

    console.log("📄 Procesando con Docxtemplater...");

    // Generar con Docxtemplater
    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{", end: "}" }
    });

    doc.render(data);

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE"
    });

    const fileName = `propuesta-${Date.now()}.pptx`;
    const tempPath = path.join(outputDir, `temp-${fileName}`);
    const finalPath = path.join(outputDir, fileName);

    // Guardar temporalmente
    fs.writeFileSync(tempPath, buf);
    console.log("✅ PPTX base generado");

    // 🔥 Si hay logo, insertarlo en el PPTX
    if (logoBase64) {
      try {
        await insertLogoIntoPPTX(tempPath, logoBase64, finalPath);
        fs.unlinkSync(tempPath); // Eliminar temporal
        
        console.log("✅ Logo insertado exitosamente");
        
        res.json({
          success: true,
          url: `/generated/${fileName}`,
          fileName,
          hasLogo: true,
          message: "Presentación generada con logo incluido"
        });
      } catch (logoErr) {
        console.error("⚠️ Error al insertar logo:", logoErr);
        
        // Si falla, usar el archivo sin logo
        fs.renameSync(tempPath, finalPath);
        
        res.json({
          success: true,
          url: `/generated/${fileName}`,
          fileName,
          hasLogo: false,
          message: "Presentación generada. Error al insertar logo automáticamente."
        });
      }
    } else {
      // Sin logo, renombrar archivo temporal
      fs.renameSync(tempPath, finalPath);
      
      res.json({
        success: true,
        url: `/generated/${fileName}`,
        fileName,
        hasLogo: false,
        message: "Presentación generada sin logo"
      });
    }

  } catch (err) {
    console.error("❌ Error generando PPTX:", err);
    
    if (err.properties && err.properties.errors) {
      console.error("Errores de template:", err.properties.errors);
      return res.status(500).json({
        error: "Error en el template",
        details: err.properties.errors
      });
    }

    res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
});

export default router;