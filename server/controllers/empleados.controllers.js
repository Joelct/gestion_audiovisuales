import { pool } from '../../database/db.js';

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM empleados');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener empleados' });
    }
};

// Obtener un empleado por id
export const getEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM empleados WHERE idempleados = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el empleado' });
    }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
    const { idempleados, nombre_empleados, cedula_empleados, tanda_labor, fecha_ingreso, estado_empleado } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO empleados (idempleados, nombre_empleados, cedula_empleados, tanda_labor, fecha_ingreso, estado_empleado) VALUES (?, ?, ?, ?, ?, ?)',
            [idempleados, nombre_empleados, cedula_empleados, tanda_labor, fecha_ingreso, estado_empleado]
        );
        res.status(201).json({ 
            id: result.insertId,
            message: 'Empleado creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el empleado' });
    }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre_empleados, cedula_empleados, tanda_labor, fecha_ingreso, estado_empleado } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE empleados SET nombre_empleados = ?, cedula_empleados = ?, tanda_labor = ?, fecha_ingreso = ?, estado_empleado = ? WHERE idempleados = ?',
            [nombre_empleados, cedula_empleados, tanda_labor, fecha_ingreso, estado_empleado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el empleado' });
    }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM empleados WHERE idempleados = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el empleado' });
    }
};
