// src/context/tipos_equiposContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import {
  getTiposEquiposRequest,
  createTipoEquipoRequest,
  deleteTipoEquipoRequest,
  getTipoEquipoRequest,
  updateTipoEquipoRequest,
} from '../api/tipos_equipos.api';

const TiposEquiposContext = createContext();

export const useTiposEquipos = () => {
  const context = useContext(TiposEquiposContext);
  if (!context) {
    throw new Error('useTiposEquipos must be used within a TiposEquiposProvider');
  }
  return context;
};

export const TiposEquiposProvider = ({ children }) => {
  const [tiposEquipos, setTiposEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTiposEquipos = async () => {
    try {
      const response = await getTiposEquiposRequest();
      setTiposEquipos(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getTipoEquipo = async (id) => {
    const response = await getTipoEquipoRequest(id);
    return response.data;
  };

  const createTipoEquipo = async (tipo_equipo) => {
    const response = await createTipoEquipoRequest(tipo_equipo);
    setTiposEquipos([...tiposEquipos, response.data]);
  };

  const updateTipoEquipo = async (id, updatedTipoEquipo) => {
    const response = await updateTipoEquipoRequest(id, updatedTipoEquipo);
    setTiposEquipos(tiposEquipos.map((tipo_equipo) => (tipo_equipo.id_tipos_equipos === id ? response.data : tipo_equipo)));
  };

  const deleteTipoEquipo = async (id) => {
    await deleteTipoEquipoRequest(id);
    setTiposEquipos(tiposEquipos.filter((tipo_equipo) => tipo_equipo.id_tipos_equipos !== id));
  };

  useEffect(() => {
    loadTiposEquipos();
  }, []);

  return (
    <TiposEquiposContext.Provider
      value={{
        tiposEquipos,
        loadTiposEquipos,
        getTipoEquipo,
        createTipoEquipo,
        updateTipoEquipo,
        deleteTipoEquipo,
        loading,
        error,
      }}
    >
      {children}
    </TiposEquiposContext.Provider>
  );
};
