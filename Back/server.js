import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

// RUTAS
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import preciosRoutes from "./routes/precios.js";
import preciosHoraRoutes from "./routes/preciosHora.js";
import vpsRoutes from "./routes/vps.js";
import pdfRoutes from "./routes/pdf.js";
import documentosRoutes from "./routes/documentos.routes.js";
import presentationRoutes from "./routes/presentation.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://localhost:3019",
  "https://blck-sheep.com",
  "https://www.blck-sheep.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

app.use("/api/documentos", documentosRoutes);
app.use("/api/usuarios", usersRoutes);
app.use("/api", authRoutes);
app.use("/api", preciosRoutes);
app.use("/api", preciosHoraRoutes);
app.use("/api/vps", vpsRoutes);
app.use("/api/generate-pdf", pdfRoutes);
app.use("/api", presentationRoutes);

app.use(
  "/generated",
  express.static(path.join(process.cwd(), "public/generated"))
);

app.use(
  "/content",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    method: req.method,
    url: req.url
  });
});

const PORT = process.env.PORT || 3019;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});
