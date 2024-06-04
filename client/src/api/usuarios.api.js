// src/api/usuarios.api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUsuariosRequest = async () => {
  return await axios.get(`${API_URL}/usuarios`);
};

export const getUsuarioRequest = async (id) => {
  return await axios.get(`${API_URL}/usuarios/${id}`);
};

export const createUsuarioRequest = async (usuario) => {
  return await axios.post(`${API_URL}/usuarios`, usuario);
};

export const updateUsuarioRequest = async (id, updatedUsuario) => {
  return await axios.put(`${API_URL}/usuarios/${id}`, updatedUsuario);
};

export const deleteUsuarioRequest = async (id) => {
  return await axios.delete(`${API_URL}/usuarios/${id}`);
};
