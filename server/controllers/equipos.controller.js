import { pool } from '../../database/db.js';

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM equipos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener equipos' });
    }
};

// Obtener un equipo por id
export const getEquipo = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM equipos WHERE idequipos = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el equipo' });
    }
};

// Crear un nuevo equipo
export const createEquipo = async (req, res) => {
    const { idequipos, descripcion_equipos, no_serial, serv_tag, tipo_equipo, descripcion_marcas, descripcion_modelo, tec_conexion_descripcion, estado_equipos } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO equipos (idequipos, descripcion_equipos, no_serial, serv_tag, tipo_equipo, descripcion_marcas, descripcion_modelo, tec_conexion_descripcion, estado_equipos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idequipos, descripcion_equipos, no_serial, serv_tag, tipo_equipo, descripcion_marcas, descripcion_modelo, tec_conexion_descripcion, estado_equipos]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Equipo creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el equipo' });
    }
};

// Actualizar un equipo
export const updateEquipo = async (req, res) => {
    const { id } = req.params;
    const { descripcion_equipos, no_serial, serv_tag, tipo_equipo, descripcion_marcas, descripcion_modelo, tec_conexion_descripcion, estado_equipos } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE equipos SET descripcion_equipos = ?, no_serial = ?, serv_tag = ?, tipo_equipo = ?, descripcion_marcas = ?, descripcion_modelo = ?, tec_conexion_descripcion = ?, estado_equipos = ? WHERE idequipos = ?',
            [descripcion_equipos, no_serial, serv_tag, tipo_equipo, descripcion_marcas, descripcion_modelo, tec_conexion_descripcion, estado_equipos, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el equipo' });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM equipos WHERE idequipos = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el equipo' });
    }
};
