// src/context/tec_conexionContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import {
  getTecConexionesRequest,
  createTecConexionRequest,
  deleteTecConexionRequest,
  getTecConexionRequest,
  updateTecConexionRequest,
} from '../api/tec_conexion.api';

const TecConexionContext = createContext();

export const useTecConexiones = () => {
  const context = useContext(TecConexionContext);
  if (!context) {
    throw new Error('useTecConexiones must be used within a TecConexionProvider');
  }
  return context;
};

export const TecConexionProvider = ({ children }) => {
  const [tecConexiones, setTecConexiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTecConexiones = async () => {
    try {
      const response = await getTecConexionesRequest();
      setTecConexiones(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getTecConexion = async (id) => {
    const response = await getTecConexionRequest(id);
    return response.data;
  };

  const createTecConexion = async (tec_conexion) => {
    const response = await createTecConexionRequest(tec_conexion);
    setTecConexiones([...tecConexiones, response.data]);
  };

  const updateTecConexion = async (id, updatedTecConexion) => {
    const response = await updateTecConexionRequest(id, updatedTecConexion);
    setTecConexiones(tecConexiones.map((tec_conexion) => (tec_conexion.idtec_conexion === id ? response.data : tec_conexion)));
  };

  const deleteTecConexion = async (id) => {
    await deleteTecConexionRequest(id);
    setTecConexiones(tecConexiones.filter((tec_conexion) => tec_conexion.idtec_conexion !== id));
  };

  useEffect(() => {
    loadTecConexiones();
  }, []);

  return (
    <TecConexionContext.Provider
      value={{
        tecConexiones,
        loadTecConexiones,
        getTecConexion,
        createTecConexion,
        updateTecConexion,
        deleteTecConexion,
        loading,
        error,
      }}
    >
      {children}
    </TecConexionContext.Provider>
  );
};
