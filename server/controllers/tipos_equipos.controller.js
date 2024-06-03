import { pool } from '../../database/db.js';

// Obtener todos los tipos de equipos
export const getTiposEquipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tipos_equipos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tipos de equipos' });
    }
};

// Obtener un tipo de equipo por id
export const getTipoEquipo = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tipos_equipos WHERE id_tipos_equipos = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el tipo de equipo' });
    }
};

// Crear un nuevo tipo de equipo
export const createTipoEquipo = async (req, res) => {
    const { id_tipos_equipos, tipos_equipos_descripcion, tipos_equipos_estado } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO tipos_equipos (id_tipos_equipos, tipos_equipos_descripcion, tipos_equipos_estado) VALUES (?, ?, ?)',
            [id_tipos_equipos, tipos_equipos_descripcion, tipos_equipos_estado]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Tipo de equipo creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el tipo de equipo' });
    }
};

// Actualizar un tipo de equipo
export const updateTipoEquipo = async (req, res) => {
    const { id } = req.params;
    const { tipos_equipos_descripcion, tipos_equipos_estado } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE tipos_equipos SET tipos_equipos_descripcion = ?, tipos_equipos_estado = ? WHERE id_tipos_equipos = ?',
            [tipos_equipos_descripcion, tipos_equipos_estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }
        res.json({ message: 'Tipo de equipo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el tipo de equipo' });
    }
};

// Eliminar un tipo de equipo
export const deleteTipoEquipo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM tipos_equipos WHERE id_tipos_equipos = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }
        res.json({ message: 'Tipo de equipo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el tipo de equipo' });
    }
};
