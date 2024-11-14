import { conexion } from "./conexion.js";

export default class Reclamos {

    buscarTodos = async () => {
        const sql = `SELECT * FROM reclamos;`
        const [result] = await conexion.query(sql);
        return result;
    }

    buscarPorId = async (idReclamo) => {
        const sql = `SELECT * FROM reclamos WHERE idReclamo = ?`;
        const [result] = await conexion.query(sql, [idReclamo]);
        return result;
    }

    crear = async ({ asunto, descripcion, idReclamoTipo, idUsuarioCreador }) => {
        const sql = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoTipo, idReclamoEstado, idUsuarioCreador) 
        VALUES (?, ?, NOW(), 1, ?, ?)`;
        const [result] = await conexion.query(sql, [asunto, descripcion, idReclamoTipo, idUsuarioCreador]);
        return result;
    }

    modificar = async (id, datos) => {
        const sql = 'UPDATE reclamos SET ? WHERE idReclamo = ?';
        const [result] = await conexion.query(sql, [datos, id]);
        return result;
    }
    

}