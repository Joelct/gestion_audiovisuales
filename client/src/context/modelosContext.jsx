// src/context/modelosContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import {
  getModelosRequest,
  createModeloRequest,
  deleteModeloRequest,
  getModeloRequest,
  updateModeloRequest,
} from '../api/modelos.api';

const ModelosContext = createContext();

export const useModelos = () => {
  const context = useContext(ModelosContext);
  if (!context) {
    throw new Error('useModelos must be used within a ModelosProvider');
  }
  return context;
};

export const ModelosProvider = ({ children }) => {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadModelos = async () => {
    try {
      const response = await getModelosRequest();
      setModelos(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getModelo = async (id) => {
    const response = await getModeloRequest(id);
    return response.data;
  };

  const createModelo = async (modelo) => {
    const response = await createModeloRequest(modelo);
    setModelos([...modelos, response.data]);
  };

  const updateModelo = async (id, updatedModelo) => {
    const response = await updateModeloRequest(id, updatedModelo);
    setModelos(modelos.map((modelo) => (modelo.idmodelos === id ? response.data : modelo)));
  };

  const deleteModelo = async (id) => {
    await deleteModeloRequest(id);
    setModelos(modelos.filter((modelo) => modelo.idmodelos !== id));
  };

  useEffect(() => {
    loadModelos();
  }, []);

  return (
    <ModelosContext.Provider
      value={{
        modelos,
        loadModelos,
        getModelo,
        createModelo,
        updateModelo,
        deleteModelo,
        loading,
        error,
      }}
    >
      {children}
    </ModelosContext.Provider>
  );
};
