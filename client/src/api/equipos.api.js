import axios from 'axios';

export const getEquiposRequest = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/equipos');
    return response;
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
    throw error;
  }
};

export const crearEquipoRequest = async (equipo) => {
  try {
    const response = await axios.post('http://localhost:3000/api/equipos', equipo);
    return response;
  } catch (error) {
    console.error('Error al crear el equipo:', error);
    throw error;
  }
};

export const editarEquipoRequest = async (id, equipo) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/equipos/${id}`, equipo);
    return response;
  } catch (error) {
    console.error('Error al editar el equipo:', error);
    throw error;
  }
};

export const deleteEquipoRequest = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/equipos/${id}`);
    return response;
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
    throw error;
  }
};

export const getEquipoRequest = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/equipos/${id}`);
    return response;
  } catch (error) {
    console.error('Error al obtener el equipo:', error);
    throw error;
  }
};
