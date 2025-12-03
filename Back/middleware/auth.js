import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jajones');

    req.user = decoded;
    next();

  } catch (error) {
    const message =
      error.name === 'TokenExpiredError'
        ? 'Token expirado'
        : error.name === 'JsonWebTokenError'
        ? 'Token inválido'
        : 'Error al verificar token';

    return res.status(401).json({ success: false, message });
  }
};
