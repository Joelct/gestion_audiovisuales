// src/api/marcas.api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMarcasRequest = async () => {
  return await axios.get(`${API_URL}/marcas`);
};

export const getMarcaRequest = async (id) => {
  return await axios.get(`${API_URL}/marcas/${id}`);
};

export const createMarcaRequest = async (marca) => {
  return await axios.post(`${API_URL}/marcas`, marca);
};

export const updateMarcaRequest = async (id, updatedMarca) => {
  return await axios.put(`${API_URL}/marcas/${id}`, updatedMarca);
};

export const deleteMarcaRequest = async (id) => {
  try {
    await axios.delete(`${API_URL}/marcas/${id}`);
  } catch (error) {
    console.error('Error al eliminar la marca:', error);
    throw error;
  }
};
