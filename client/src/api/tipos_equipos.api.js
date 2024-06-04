// src/api/tipos_equipos.api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTiposEquiposRequest = async () => {
  return await axios.get(`${API_URL}/tipos_equipos`);
};

export const getTipoEquipoRequest = async (id) => {
  return await axios.get(`${API_URL}/tipos_equipos/${id}`);
};

export const createTipoEquipoRequest = async (tipo_equipo) => {
  return await axios.post(`${API_URL}/tipos_equipos`, tipo_equipo);
};

export const updateTipoEquipoRequest = async (id, updatedTipoEquipo) => {
  return await axios.put(`${API_URL}/tipos_equipos/${id}`, updatedTipoEquipo);
};

export const deleteTipoEquipoRequest = async (id) => {
  return await axios.delete(`${API_URL}/tipos_equipos/${id}`);
};
