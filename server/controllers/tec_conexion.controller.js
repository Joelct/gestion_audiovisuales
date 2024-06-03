import { pool } from '../../database/db.js';

// Obtener todas las tecnologías de conexión
export const getTecConexiones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tec_conexion');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tecnologías de conexión' });
    }
};

// Obtener una tecnología de conexión por id
export const getTecConexion = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tec_conexion WHERE idtec_conexion = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tecnología de conexión no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la tecnología de conexión' });
    }
};

// Crear una nueva tecnología de conexión
export const createTecConexion = async (req, res) => {
    const { idtec_conexion, tec_conexion_descrip, tec_conexion_estado } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO tec_conexion (idtec_conexion, tec_conexion_descrip, tec_conexion_estado) VALUES (?, ?, ?)',
            [idtec_conexion, tec_conexion_descrip, tec_conexion_estado]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Tecnología de conexión creada correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la tecnología de conexión' });
    }
};

// Actualizar una tecnología de conexión
export const updateTecConexion = async (req, res) => {
    const { id } = req.params;
    const { tec_conexion_descrip, tec_conexion_estado } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE tec_conexion SET tec_conexion_descrip = ?, tec_conexion_estado = ? WHERE idtec_conexion = ?',
            [tec_conexion_descrip, tec_conexion_estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tecnología de conexión no encontrada' });
        }
        res.json({ message: 'Tecnología de conexión actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la tecnología de conexión' });
    }
};

// Eliminar una tecnología de conexión
export const deleteTecConexion = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM tec_conexion WHERE idtec_conexion = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tecnología de conexión no encontrada' });
        }
        res.json({ message: 'Tecnología de conexión eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la tecnología de conexión' });
    }
};
