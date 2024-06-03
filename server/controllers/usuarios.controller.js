import { pool } from '../../database/db.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Obtener un usuario por id
export const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { idusuarios, nombre_usuario, cedula_usuario, no_carnet, tipo_usuario, tipo_persona, estado_usuario } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (idusuarios, nombre_usuario, cedula_usuario, no_carnet, tipo_usuario, tipo_persona, estado_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [idusuarios, nombre_usuario, cedula_usuario, no_carnet, tipo_usuario, tipo_persona, estado_usuario]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, cedula_usuario, no_carnet, tipo_usuario, tipo_persona, estado_usuario } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre_usuario = ?, cedula_usuario = ?, no_carnet = ?, tipo_usuario = ?, tipo_persona = ?, estado_usuario = ? WHERE idusuarios = ?',
            [nombre_usuario, cedula_usuario, no_carnet, tipo_usuario, tipo_persona, estado_usuario, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE idusuarios = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};
