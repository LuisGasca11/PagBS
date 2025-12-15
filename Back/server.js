import dotenv from "dotenv";
dotenv.config();

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

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://blck-sheep.com",
      "http://blck-sheep.com",
      "https://www.blck-sheep.com",
      "http://www.blck-sheep.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/usuarios", usersRoutes);
app.use("/api", authRoutes);
app.use("/api", preciosRoutes);
app.use("/api", preciosHoraRoutes);
app.use("/api/vps", vpsRoutes);
app.use("/api/generate-pdf", pdfRoutes);
app.use("/api/documentos", documentosRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando :3");
});

const PORT = process.env.PORT || 3019;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});