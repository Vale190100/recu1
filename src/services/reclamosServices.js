import express from "express";
import Reclamos from "../database/reclamos.js";
import OficinasService from "./oficinasServices.js";
import UsuariosOficinas from "../database/usuariosOficinas.js";

export default class ReclamosService {

    constructor() {
        this.reclamos = new Reclamos();
        this.usuarioOficinas = new UsuariosOficinas()
        this.oficinasService = new OficinasService()
    }

    buscarTodos = async () => {
        return await this.reclamos.buscarTodos();
    }

    buscarPorId = async (id) => {
        const result = await this.reclamos.buscarPorId(id);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async (reclamo) => {
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return { estado: false, mensaje: 'Reclamo no creado' };
        }
        return { estado: true, mensaje: 'Reclamo creado', data: await this.buscarPorId(reclamoCreado.insertId) };
    }

    modificar = async (id, datos) => {
        const existe = await this.reclamos.buscarPorId(id)
        if (existe === null || existe.length === 0) {
            return { estado: false, mensaje: 'Reclamo no existe' };
        }
        await this.reclamos.modificar(id, datos);
        const result = await this.reclamos.buscarPorId(id)
        return { estado: true, mensaje: 'Reclamo modificado con exito', data: result }
    }



}

