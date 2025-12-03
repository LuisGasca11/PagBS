import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import preciosRoutes from "./routes/precios.js";
import preciosHoraRoutes from "./routes/preciosHora.js";
import vpsRoutes from "./routes/vps.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api", authRoutes);
app.use("/api", preciosRoutes);
app.use("/api", preciosHoraRoutes);
app.use("/api/vps", vpsRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando :3");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
