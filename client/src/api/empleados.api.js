import axios from 'axios';

const API_URL = 'http://localhost:3000/api/marcas';

export const getEmpleadosRequest = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw error;
  }
};

export const crearEmpleadoRequest = async (empleado) => {
  try {
    const response = await axios.post(API_URL, empleado);
    return response;
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    throw error;
  }
};

export const editarEmpleadoRequest = async (id, empleado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empleado);
    return response;
  } catch (error) {
    console.error('Error al editar el empleado:', error);
    throw error;
  }
};

export const deleteEmpleadoRequest = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    throw error;
  }
};

export const getEmpleadoRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    throw error;
  }
};
