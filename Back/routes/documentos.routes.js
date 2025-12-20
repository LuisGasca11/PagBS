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

// Manejar preflight OPTIONS para la ruta de descarga
router.options("/download", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// Ruta de descarga pública (con token JWT)
router.get("/download", descargarDocumento);

// Preview público
router.get("/public/:token", previewDocumentoPublico);

// Rutas protegidas
router.get("/:id/preview", authRequired, previewDocumento);
router.get("/:id/public-preview", authRequired, generarPreviewPublico);
router.get("/:id/download-url", authRequired, generarUrlDescarga);

router.get("/", authRequired, getDocumentos);

router.post("/", authRequired, adminOnly, uploadAnyFile.single("file"), subirDocumento);
router.delete("/:id", authRequired, adminOnly, eliminarDocumento);

export default router;