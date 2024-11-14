import ReclamosService from "../services/reclamosServices.js";

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        try {
            const reclamos = await this.service.buscarTodos();
            res.status(200).send(reclamos);

        } catch (error) {
            console.log(error)
            res.status(500).send({ 
                error: "Error interno en el servidor" });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const id = req.params.idReclamo;
            const error = this.chequeoId(id);
            if (error) {
                return res.status(400).send(error);
            }

            const result = await this.service.buscarPorId(id);
            if (result === null) {
                return res.status(400).send({ 
                    mensaje: 'No se encontro el reclamo con ese id' });
            }

            res.status(200).send({ 
                estado: true, result: result });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                 error: "Error interno en el servidor" });
        }
    }


    crear = async (req, res) => {
        try {
            const { asunto, descripcion, idReclamoTipo, idUsuarioCreador } = req.body;

            if (asunto === undefined || idReclamoTipo === undefined || idUsuarioCreador === undefined) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Faltan datos obligatorios."
                })
            }

            const reclamo = {
                asunto,
                descripcion,
                idReclamoTipo,
                idUsuarioCreador
            }

            const result = await this.service.crear(reclamo);
            if (!result.estado) {
                res.status(404).send({ 
                    estado: "Falla", mensaje: result.mensaje });
            }
            res.status(201).send({ 
                estado: "OK", data: result.data });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    modificar = async (req, res) => {
        try {
            const id = req.params.idReclamo;
            const error = this.chequeoId(id);
            if (error) {
                return res.status(400).send(error);
            }

            const datos = req.body;
            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "No se enviaron datos para ser modificados."
                });
            }

            const result = await this.service.modificar(id, datos);
            if (result.estado) {
                res.status(200).send({ estado: "OK", mensaje: result.mensaje, data: result.data });
            } else {
                res.status(404).send({ estado: "Falla", mensaje: result.mensaje });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    // atender = async (req, res) => { //Permite a un empleado cambiar el estado de un reclamo.
    //     try {
    //         const idReclamo = req.params.idReclamo
    //         const idReclamoEstado = request.body.idReclamoEstado

    //         const errorId = this.chequeoId(idReclamo);
    //         if (errorId) {
    //             return res.status(400).send(errorId);
    //         }

    //         const errorEstadoId = this.chequeoId(idReclamoEstado)
    //         if (errorEstadoId) {
    //             return res.status(400).send(errorEstadoId);
    //         }

    //         const data = {
    //             idReclamoEstado
    //         }

    //         const modificado = await this.service.atender(idReclamo, data)

    //         if (!modificado.estado) {
    //             return res.status(400).send({ 
    //                 estado: "ok", mensaje: modificado.mensaje });
    //         } else {
    //             return res.status(200).send({ 
    //                 estado: "ok", mensaje: modificado.mensaje });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).send({ 
    //             estado: "error", mensaje: "Error interno en el servidor..." });
    //     }
    // }




    chequeoId(id) {

        if (id === undefined) {
            return { mensaje: 'El id es requerido' };
        }
        if (isNaN(id)) {
            return { mensaje: 'El id debe ser un número' };
        }
        if (!Number.isInteger(Number(id))) {
            return { mensaje: 'El id debe ser un número entero' };
        }
        if (id <= 0) {
            return { mensaje: 'El id debe ser un número positivo' };
        }
        return null;
    }  

}