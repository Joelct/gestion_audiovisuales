import { pool } from '../../database/db.js';

//Obtener todos los procesos almacenados
export const getProcesos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM procesos')
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los procesos' });
    }
};

//Obtener un proceso almacenado por id
export const getProceso = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM procesos WHERE no_prestamo = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proceso no encontrado' })
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el proceso' })
    }
};

// Crear un nuevo proceso
export const createProceso = async (req, res) => {
    const { no_prestamo, empleado, equipo, usuario, fecha_prestamo, fecha_devolucion, comentario, estado } = req.body;
    try {
        const[result] = await pool.query(
            'INSERT INTO procesos (no_prestamo, empleado, equipo, usuario, fecha_prestamo, fecha_devolucion, comentario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [no_prestamo, empleado, equipo, usuario, fecha_prestamo, fecha_devolucion, comentario, estado]
        );
        res.status(201).json({
            id: result.insertId,
            messge: 'Proceso creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el proceso' })
    }
};

//Actualizar un proceso

export const updateProceso = async (req, res) => {
    const { id } = req.params;
    const {empleado, equipo, usuario, fecha_prestamo, fecha_devolucion, comentario, estado} = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE procesos SET empleado = ?, equipo = ?, usuario = ?, fecha_prestamo = ?, fecha_devolucion = ?, comentario = ?, estado = ? WHERE no_prestamo = ?', 
            [empleado, equipo, usuario, fecha_prestamo, fecha_devolucion, comentario, estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proceso no encontrado' })
        }
        res.json({ message: 'Proceso actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el proceso' })
    }
};

//Eliminar un proceso
export const deleteProceso = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM procesos WHERE no_prestamo = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }
        res.json({ message: 'Proceso eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el proceso' });
    }
};