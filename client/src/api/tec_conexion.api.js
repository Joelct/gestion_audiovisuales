// src/api/tec_conexion.api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTecConexionesRequest = async () => {
  return await axios.get(`${API_URL}/tec_conexiones`);
};

export const getTecConexionRequest = async (id) => {
  return await axios.get(`${API_URL}/tec_conexiones/${id}`);
};

export const createTecConexionRequest = async (tec_conexion) => {
  return await axios.post(`${API_URL}/tec_conexiones`, tec_conexion);
};

export const updateTecConexionRequest = async (id, updatedTecConexion) => {
  return await axios.put(`${API_URL}/tec_conexiones/${id}`, updatedTecConexion);
};

export const deleteTecConexionRequest = async (id) => {
  return await axios.delete(`${API_URL}/tec_conexiones/${id}`);
};
