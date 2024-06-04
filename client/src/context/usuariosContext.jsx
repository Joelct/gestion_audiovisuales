// src/context/usuariosContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import {
  getUsuariosRequest,
  createUsuarioRequest,
  deleteUsuarioRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
} from '../api/usuarios.api';

const UsuariosContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error('useUsuarios must be used within a UsuariosProvider');
  }
  return context;
};

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsuarios = async () => {
    try {
      const response = await getUsuariosRequest();
      setUsuarios(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getUsuario = async (id) => {
    const response = await getUsuarioRequest(id);
    return response.data;
  };

  const createUsuario = async (usuario) => {
    const response = await createUsuarioRequest(usuario);
    setUsuarios([...usuarios, response.data]);
  };

  const updateUsuario = async (id, updatedUsuario) => {
    const response = await updateUsuarioRequest(id, updatedUsuario);
    setUsuarios(usuarios.map((usuario) => (usuario.idusuarios === id ? response.data : usuario)));
  };

  const deleteUsuario = async (id) => {
    await deleteUsuarioRequest(id);
    setUsuarios(usuarios.filter((usuario) => usuario.idusuarios !== id));
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        loadUsuarios,
        getUsuario,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        loading,
        error,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
