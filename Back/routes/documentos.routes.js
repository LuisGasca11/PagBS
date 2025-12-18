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

router.get("/download", (req, res, next) => {
  next();
}, descargarDocumento);

router.get("/public/:token", previewDocumentoPublico);

router.get("/:id/preview", authRequired, previewDocumento);
router.get("/:id/public-preview", authRequired, generarPreviewPublico);
router.get("/:id/download-url", authRequired, generarUrlDescarga);

router.get("/", authRequired, getDocumentos);

router.post("/", authRequired, adminOnly, uploadAnyFile.single("file"), subirDocumento);
router.delete("/:id", authRequired, adminOnly, eliminarDocumento);


export default router;