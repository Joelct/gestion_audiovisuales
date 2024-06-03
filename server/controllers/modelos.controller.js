import { pool } from '../../database/db.js';

// Obtener todos los modelos
export const getModelos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM modelos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener modelos' });
    }
};

// Obtener un modelo por id
export const getModelo = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM modelos WHERE idmodelos = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el modelo' });
    }
};

// Crear un nuevo modelo
export const createModelo = async (req, res) => {
    const { idmodelos, descripcion_modelo, estado_modelo, idmarcas } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO modelos (idmodelos, descripcion_modelo, estado_modelo, idmarcas) VALUES (?, ?, ?, ?)',
            [idmodelos, descripcion_modelo, estado_modelo, idmarcas]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Modelo creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el modelo' });
    }
};

// Actualizar un modelo
export const updateModelo = async (req, res) => {
    const { id } = req.params;
    const { descripcion_modelo, estado_modelo, idmarcas } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE modelos SET descripcion_modelo = ?, estado_modelo = ?, idmarcas = ? WHERE idmodelos = ?',
            [descripcion_modelo, estado_modelo, idmarcas, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json({ message: 'Modelo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el modelo' });
    }
};

// Eliminar un modelo
export const deleteModelo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM modelos WHERE idmodelos = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json({ message: 'Modelo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el modelo' });
    }
};
