import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "jajones"
    );

    if (!decoded.id_usuario || !decoded.rol) {
      return res.status(401).json({
        message: "Token inválido (payload incompleto)",
      });
    }

    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Token expirado"
          : "Token inválido",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({
      message: "Acceso solo para administradores",
    });
  }
  next();
};
