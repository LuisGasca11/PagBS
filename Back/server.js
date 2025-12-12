import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import preciosRoutes from "./routes/precios.js";
import preciosHoraRoutes from "./routes/preciosHora.js";
import vpsRoutes from "./routes/vps.js";
import pdfRoutes from "./routes/pdf.js";

dotenv.config();

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

// Logs
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/usuarios", usersRoutes);
app.use("/api", authRoutes);
app.use("/api", preciosRoutes);
app.use("/api", preciosHoraRoutes);
app.use("/api/vps", vpsRoutes);
app.use("/api/generate-pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando :3");
});

const PORT = process.env.PORT || 3019;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
