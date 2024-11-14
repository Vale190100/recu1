// import Usuarios from '../database/Usuarios.js';
import Usuarios from '../database/usuarios.js';

export default class UsuariosService {

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscarTodos = () => {
        return this.usuarios.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    }


    crear = async (usuario) => {
        const usuarioCreado = await this.usuarios.crear(usuario);
        if (!usuarioCreado) {
            return { estado: false, mensaje: 'Usuario no creado' };
        }
        return { estado: true, mensaje: 'Usuario creado', data: await this.buscarPorId(usuarioCreado.insertId) };
    }

    modificar = async (id, datos) => {
        await this.usuarios.modificar(id, datos);

        const result = await this.buscarPorId(id)

        if (result === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        } 
        if (!result) {
            return { estado: false, mensaje: 'Reclamo no modificado' };
        }
        return {estado: true, mensaje: 'Reclamo modificado con exito', data: result}
    }
    

}