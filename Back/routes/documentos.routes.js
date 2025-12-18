import { Router } from "express";

import {
  getDocumentos,
  subirDocumento,
  descargarDocumento,
  generarUrlDescarga,
  eliminarDocumento,
  generarPreviewPublico,
  previewDocumentoPublico,
  previewDocumento,
} from "../controllers/documentos.controller.js";

import { authRequired, adminOnly } from "../middleware/auth.js";
import { uploadAnyFile } from "../middleware/uploadDocuments.js";

const router = Router();

console.log('🔥 RUTAS DE DOCUMENTOS CARGÁNDOSE...');

// 🔓 Rutas públicas sin autenticación
router.get("/download", (req, res, next) => {
  console.log('✅ HIT en /download');
  console.log('Query params:', req.query);
  next();
}, descargarDocumento);

router.get("/public/:token", previewDocumentoPublico);

// 🔐 Rutas protegidas con ID específico
router.get("/:id/preview", authRequired, previewDocumento);
router.get("/:id/public-preview", authRequired, generarPreviewPublico);
router.get("/:id/download-url", authRequired, generarUrlDescarga);

// 🔐 Rutas generales protegidas
router.get("/", authRequired, getDocumentos);

// 📝 CRUD
router.post("/", authRequired, adminOnly, uploadAnyFile.single("file"), subirDocumento);
router.delete("/:id", authRequired, adminOnly, eliminarDocumento);

console.log('🔥 RUTAS DE DOCUMENTOS REGISTRADAS');

export default router;