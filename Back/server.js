import dotenv from "dotenv";
dotenv.config();

// 🔥 AGREGAR ESTO PARA VERIFICAR
console.log('🔧 Configuración inicial:');
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - PORT:', process.env.PORT);
console.log('  - API_PUBLIC_URL:', process.env.API_PUBLIC_URL);
console.log('  - DB_HOST:', process.env.DB_HOST);
console.log('  - DOC_PREVIEW_SECRET:', process.env.DOC_PREVIEW_SECRET ? '✓ Configurado' : '✗ NO configurado');

import express from "express";
import cors from "cors";
import path from "path";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import preciosRoutes from "./routes/precios.js";
import preciosHoraRoutes from "./routes/preciosHora.js";
import vpsRoutes from "./routes/vps.js";
import pdfRoutes from "./routes/pdf.js";
import documentosRoutes from "./routes/documentos.routes.js";

const app = express();

// 🔥 SOLO UN CORS - el más completo
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://blck-sheep.com', 'https://www.blck-sheep.com']
    : ['http://localhost:5173', 'http://localhost:3019', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para logs
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 🔥 IMPORTANTE: Las rutas públicas (sin auth) PRIMERO
app.use("/api/documentos", documentosRoutes);

// Luego las demás rutas
app.use("/api/usuarios", usersRoutes);
app.use("/api", authRoutes);
app.use("/api", preciosRoutes);
app.use("/api", preciosHoraRoutes);
app.use("/api/vps", vpsRoutes);
app.use("/api/generate-pdf", pdfRoutes);

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get("/", (req, res) => {
  res.send("API funcionando :3");
});

const PORT = process.env.PORT || 3019;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 DOC_PREVIEW_SECRET: ${process.env.DOC_PREVIEW_SECRET ? '✓ Configurado' : '✗ NO configurado'}`);
});