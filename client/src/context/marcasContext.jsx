import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from 'react';
import {
  getMarcasRequest,
  getMarcaRequest,
  createMarcaRequest,
  updateMarcaRequest,
  deleteMarcaRequest
} from '../api/marcas.api';

const MarcasContext = createContext();

export const useMarcas = () => {
  const context = useContext(MarcasContext);
  if (!context) {
    throw new Error('useMarcas debe estar dentro de un MarcasProvider');
  }
  return context;
};

export const MarcasContextProvider = ({ children }) => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMarcas = async () => {
    try {
      const response = await getMarcasRequest();
      setMarcas(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las marcas');
      setLoading(false);
    }
  };

  const getMarca = async (id) => {
    try {
      const response = await getMarcaRequest(id);
      return response.data;
    } catch (error) {
      setError('Error al obtener la marca');
      console.error(error);
      throw error;
    }
  };

  const createMarca = async (marca) => {
    try {
      const response = await createMarcaRequest(marca);
      setMarcas([...marcas, response.data]);
    } catch (error) {
      setError('Error al crear la marca');
      console.error(error);
    }
  };

  const updateMarca = async (id, updatedMarca) => {
    try {
      const response = await updateMarcaRequest(id, updatedMarca);
      setMarcas(marcas.map((marca) => (marca.idmarcas === id ? response.data : marca)));
    } catch (error) {
      setError('Error al actualizar la marca');
      console.error(error);
    }
  };

  const deleteMarca = async (id) => {
    try {
      await deleteMarcaRequest(id);
      setMarcas(marcas.filter((marca) => marca.idmarcas !== id));
    } catch (error) {
      setError('Error al eliminar la marca');
      console.error(error);
    }
  };

  useEffect(() => {
    loadMarcas();
  }, []);

  return (
    <MarcasContext.Provider
      value={{
        marcas,
        loadMarcas,
        getMarca,
        createMarca,
        updateMarca,
        deleteMarca,
        loading,
        error,
      }}
    >
      {children}
    </MarcasContext.Provider>
  );
};

MarcasContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// import { createContext, useState, useContext, useEffect } from 'react';
// import {
//   getMarcasRequest,
//   getMarcaRequest,
//   createMarcaRequest,
//   updateMarcaRequest,
//   deleteMarcaRequest
// } from '../api/marcas.api';

// const MarcasContext = createContext();

// export const useMarcas = () => {
//   const context = useContext(MarcasContext);
//   if (!context) {
//     throw new Error('useMarcas debe estar dentro de un MarcasProvider');
//   }
//   return context;
// };

// export const MarcasContextProvider = ({ children }) => {
//   const [marcas, setMarcas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadMarcas = async () => {
//     try {
//       const response = await getMarcasRequest();
//       setMarcas(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const getMarca = async (id) => {
//     const response = await getMarcaRequest(id);
//     return response.data;
//   };

//   const createMarca = async (marca) => {
//     const response = await createMarcaRequest(marca);
//     setMarcas([...marcas, response.data]);
//   };

//   const updateMarca = async (id, updatedMarca) => {
//     const response = await updateMarcaRequest(id, updatedMarca);
//     setMarcas(marcas.map((marca) => (marca.idmarcas === id ? response.data : marca)));
//   };

//   const deleteMarca = async (id) => {
//     try {
//       await deleteMarcaRequest(id);
//       setMarcas(marcas.filter((marca) => marca.idmarcas !== id));
//     } catch (error) {
//       setError('Error al eliminar la marca');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadMarcas();
//   }, []);

//   return (
//     <MarcasContext.Provider
//       value={{
//         marcas,
//         loadMarcas,
//         getMarca,
//         createMarca,
//         updateMarca,
//         deleteMarca,
//         loading,
//         error,
//       }}
//     >
//       {children}
//     </MarcasContext.Provider>
//   );
// };
