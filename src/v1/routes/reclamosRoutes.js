import express from "express";
import ReclamosControllers from "../../controllers/reclamosControllers.js";
import { verifyToken, checkRole } from "../../middlewares/authMiddlewares.js"; 
import { Roles } from "../../middlewares/roles.js";

const router = express.Router();
const reclamosControllers = new ReclamosControllers();

// Solo el administrador puede ver todos los reclamos
router.get("/", verifyToken, checkRole([1]), reclamosControllers.buscarTodos); 

// Solo el administrador puede buscar un reclamo específico por ID
router.get("/:idReclamo", verifyToken, checkRole([1]), reclamosControllers.buscarPorId); 

// Solo el cliente puede crear un reclamo
router.post('/', verifyToken, checkRole([3]), reclamosControllers.crear); 

// Solo el administrador puede modificar reclamos
router.patch("/:idReclamo", verifyToken, checkRole([1]), reclamosControllers.modificar); 

// // Solo el empleado puede atender los reclamos
// router.put('/atender/:idReclamo', verifyToken, checkRole([2]), reclamosControllers.atender); 

// // Ruta consultar para clientes
// router.get('/consultar/', verifyToken, Roles([3]), reclamosControllers.consultar);

// // Ruta cancelar reclamos solo clientes
// router.patch('/cancelar/:idReclamo', verifyToken, Roles([3]), reclamosControllers.cancelar); 

// // Ruta descargar informe para administrador
// router.get("/informe/:formato?", verifyToken, Roles([1]), reclamosControllers.informe); 

// // Estadistica para ardministrador
// router.get("/estadistica", verifyToken, Roles([3]), reclamosControllers.estadística);

// // Listar reclamos por oficinas para Empleados
// router.get("/por-oficina/", verifyToken, Roles([2]) , reclamosControllers.oficina)

export { router };