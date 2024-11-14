import jwt from 'jsonwebtoken';
import { secretKey } from '../config/jwtConfig.js';  // Asegúrate de usar la extensión .js

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Suponiendo que el token viene en el header 'Authorization'

  if (!token) {
    return res.status(403).json({ message: 'No se ha proporcionado un token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;  // Guardamos la información del usuario en la solicitud
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token inválido' });
  }
};

// Middleware para verificar el rol
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user)
      return res.status(403).send({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
  };
};


export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado
  if (!token) return res.status(401).json({ mensaje: 'Acceso denegado: no se proporcionó un token' });

  try {
    const decoded = jwt.verify(token, secretKey); // Verificar el token
    req.user = decoded; // Colocar el payload del token en req.user
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

export { verifyToken, checkRole };  // Exportación nombrada