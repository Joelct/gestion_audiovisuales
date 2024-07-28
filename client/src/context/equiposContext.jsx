import { createContext, useContext, useState } from "react";
import { getEquiposRequest, getEquipoRequest, crearEquipoRequest, editarEquipoRequest, deleteEquipoRequest } from "../api/equipos.api";

export const EquiposContext = createContext();

export const useEquipos = () => {
  const context = useContext(EquiposContext);
  if (!context) {
    throw new Error("useEquipos must be used within an EquiposContextProvider");
  }
  return context;
};

export const EquiposContextProvider = ({ children }) => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEquipos = async () => {
    try {
      const response = await getEquiposRequest();
      if (response && response.data) {
        setEquipos(response.data);
      } else {
        setError('No se pudieron cargar los datos de los equipos');
      }
      setLoading(false);
    } catch (error) {
      setError('Error al cargar los equipos');
      setLoading(false);
    }
  };

  const deleteEquipo = async (idequipos) => {
    await deleteEquipoRequest(idequipos);
    setEquipos(equipos.filter((equipo) => equipo.idequipos !== idequipos));
  };

  const getEquipo = async (idequipos) => {
    try {
      const response = await getEquipoRequest(idequipos);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createEquipo = async (equipo) => {
    try {
      const response = await crearEquipoRequest(equipo);
      setEquipos([...equipos, response.data]);
    } catch (error) {
      setError('Error al crear el equipo');
    }
  };

  const editarEquipo = async (idequipos, updatedEquipo) => {
    try {
      const response = await editarEquipoRequest(idequipos, updatedEquipo);
      setEquipos(equipos.map((equipo) => (equipo.idequipos === idequipos ? response.data : equipo)));
    } catch (error) {
      setError('Error al editar el equipo');
    }
  };

  return (
    <EquiposContext.Provider
      value={{
        equipos,
        loadEquipos,
        deleteEquipo,
        getEquipo,
        createEquipo,
        editarEquipo,
        loading,
        error,
      }}
    >
      {children}
    </EquiposContext.Provider>
  );
};











// import { createContext, useContext, useState } from "react";
// import { getEquiposRequest, getEquipoRequest } from "../api/equipos.api";

// export const EquiposContext = createContext();

// export const useEquipos = () => {
//   const context = useContext(EquiposContext);
//   if (!context) {
//     throw new Error("useEquipos must be used within an EquiposContextProvider");
//   }
//   return context;
// };

// export const EquiposContextProvider = ({ children }) => {
//   const [equipos, setEquipos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadEquipos = async () => {
//     try {
//       const response = await getEquiposRequest();
//       if (response && response.data) {
//         setEquipos(response.data);
//       } else {
//         setError('No se pudieron cargar los datos de los equipos');
//       }
//       setLoading(false);
//     } catch (error) {
//       setError('Error al cargar los equipos');
//       setLoading(false);
//     }
//   };

//   const deleteEquipo = (idequipos) => {
//     setEquipos(equipos.filter((equipo) => equipo.idequipos !== idequipos));
//   };

//   const getEquipo = async (idequipos) => {
//     try {
//        const response = await getEquipoRequest(idequipos);
//        return response.data;
//     } catch (error) {
//         console.log(error);
//     }
//   };

//   return (
//     <EquiposContext.Provider 
//     value={{ 
//       equipos, loadEquipos, deleteEquipo, getEquipo, loading, error }}>
//       {children}
//     </EquiposContext.Provider>
//   );
// };
