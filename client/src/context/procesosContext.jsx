import { createContext, useState, useContext, useEffect } from 'react';
import {
    getProcesosRequest,
    getProcesoRequest,
    createProcesoRequest,
    updateProcesoRequest,
    deleteProcesoRequest,
  } from '../api/procesos.api';

  const ProcesosContext = createContext();

  export const useProcesos = () => {
    const context = useContext(ProcesosContext);
    if (!context) {
        throw new Error('useProcesos must be used within a ProcesosProvider')
    }
    return context;
  };

  export const ProcesosProvider = ({ children }) => {
    const [procesos, setProcesos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProcesos = async () => {
      try {
        const response = await getProcesosRequest();
        setProcesos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const getProceso = async (id) => {
        const response = await getProcesoRequest(id);
        return response.data;
    };

    const createProceso = async (proceso) => {
        const response = await createProcesoRequest(proceso);
        setProcesos([...procesos, response.data]);
    };

    const updateProceso = async (id, updatedProceso) => {
        const response = await updateProcesoRequest(id, updatedProceso);
        setProcesos(procesos.map((proceso) => (proceso.no_prestamo === id ? response.data : proceso)));
    };

    const deleteProceso = async (id) => {
        await deleteProcesoRequest(id);
        setProcesos(procesos.filter((proceso) => proceso.no_prestamo !== id));
    };

    useEffect(() => {
        loadProcesos();
    }, []);

    return (
       <ProcesosContext.Provider
         value={{
            procesos,
            loadProcesos,
            getProceso,
            createProceso,
            updateProceso,
            deleteProceso,
            loading,
            error,
         }} 
      >
        {children}
      </ProcesosContext.Provider>   
    );
  };