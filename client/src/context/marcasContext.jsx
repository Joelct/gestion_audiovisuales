// marcasContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { obtenerMarcas, eliminarMarca } from '../api/marcas.api';

const MarcasContext = createContext();

export const useMarcas = () => {
    const context = useContext(MarcasContext);
    if (!context) {
        throw new Error("useMarcas debe estar dentro de MarcasContextProvider");
    }
    return context;
};

export const MarcasContextProvider = ({ children }) => {
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMarcas = async () => {
        try {
            const data = await obtenerMarcas();
            setMarcas(data);
        } catch (error) {
            setError('Error al cargar las marcas');
        } finally {
            setLoading(false);
        }
    };

    const deleteMarca = (idmarcas) => {
        setMarcas(marcas.filter(marca => marca.idmarcas !== idmarcas));
    };

    return (
        <MarcasContext.Provider value={{ marcas, loadMarcas, deleteMarca, loading, error }}>
            {children}
        </MarcasContext.Provider>
    );
};
