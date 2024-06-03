import { pool } from '../../database/db.js';

// Obtener todas las marcas
export const getMarcas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM marcas');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener marcas' });
    }
};

// Obtener una marca por id
export const getMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM marcas WHERE idmarcas = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la marca' });
    }
};

// Crear una nueva marca
export const createMarca = async (req, res) => {
    const { idmarcas, descripcion_marcas, estado_marcas } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO marcas (idmarcas, descripcion_marcas, estado_marcas) VALUES (?, ?, ?)',
            [idmarcas, descripcion_marcas, estado_marcas]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Marca creada correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la marca' });
    }
};

// Actualizar una marca
export const updateMarca = async (req, res) => {
    const { id } = req.params;
    const { descripcion_marcas, estado_marcas } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE marcas SET descripcion_marcas = ?, estado_marcas = ? WHERE idmarcas = ?',
            [descripcion_marcas, estado_marcas, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la marca' });
    }
};

// Eliminar una marca
export const deleteMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM marcas WHERE idmarcas = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la marca' });
    }
};
