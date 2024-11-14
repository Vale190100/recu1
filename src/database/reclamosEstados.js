import {conexion} from "./conexion.js";

export default class ReclamosEstados{

    buscarTodos = async () => {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';
        const [result] = await conexion.query(sql);

        return result 
    }

    buscarPorId = async (id) => {
        const sql = `SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamoEstado = ?`;
        const [result] = await conexion.query(sql, [id]);

        return (result.length > 0) ? result[0] : null;
    
    }

    crear = async ({descripcion, activo}) => {
        const sql = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?,?)';
        const [result] = await conexion.query(sql, [descripcion, activo]);
        
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No de pudo modificar el reclamo"
            })
        }
        
        return this.buscarPorId(result.insertId
        )
    
    }


    modificar = async (id, datos) => {
        const sql = 'UPDATE reclamos_estado SET ? WHERE idReclamoEstado = ?';
        const [result] = await conexion.query(sql, [datos, id]);
        return result
    }

}