// marcas.api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Reemplaza con la URL de tu backend

export const obtenerMarcas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/marcas`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las marcas');
    }
};

export const obtenerMarcaPorId = async (idMarca) => {
    try {
        const response = await axios.get(`${BASE_URL}/marcas/${idMarca}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la marca');
    }
};

export const crearMarca = async (nuevaMarca) => {
    try {
        const response = await axios.post(`${BASE_URL}/marcas`, nuevaMarca);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear la marca');
    }
};

export const actualizarMarca = async (idMarca, marcaActualizada) => {
    try {
        const response = await axios.put(`${BASE_URL}/marcas/${idMarca}`, marcaActualizada);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar la marca');
    }
};

export const eliminarMarca = async (idMarca) => {
    try {
        const response = await axios.delete(`${BASE_URL}/marcas/${idMarca}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar la marca');
    }
};
