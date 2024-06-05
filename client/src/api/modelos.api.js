import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getModelosRequest = async () => {
  return await axios.get(`${API_URL}/modelos`);
};

export const getModeloRequest = async (id) => {
  return await axios.get(`${API_URL}/modelos/${id}`);
};

export const createModeloRequest = async (modelo) => {
  return await axios.post(`${API_URL}/modelos`, modelo);
};

export const updateModeloRequest = async (id, updatedModelo) => {
  return await axios.put(`${API_URL}/modelos/${id}`, updatedModelo);
};

export const deleteModeloRequest = async (id) => {
  return await axios.delete(`${API_URL}/modelos/${id}`);
};
