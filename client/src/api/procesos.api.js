import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProcesosRequest = async () => {
    return await axios.get(`${API_URL}/Procesos`);
};

export const getProcesoRequest = async (id) => {
  return await axios.get(`${API_URL}/Procesos/${id}`);
};

export const createProcesoRequest = async (proceso) => {
  return await axios.post(`${API_URL}/Procesos`, proceso);
};

export const updateProcesoRequest = async (id, updatedProceso) => {
  return await axios.put(`${API_URL}/Procesos/${id}`, updatedProceso);
};

export const deleteProcesoRequest = async (id) => {
  return await axios.delete(`${API_URL}/Procesos/${id}`);
};