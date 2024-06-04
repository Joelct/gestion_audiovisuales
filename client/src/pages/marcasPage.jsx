// MarcasPage.jsx
import React, { useEffect } from 'react';
import { useMarcas } from '../context/marcasContext';
import MarcasCard from '../components/marcasCard';
import { Link } from 'react-router-dom';

function MarcasPage() {
    const { marcas, loadMarcas, loading, error } = useMarcas();

    useEffect(() => {
        loadMarcas();
    }, []);

    if (loading) return <p>Cargando marcas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Marcas</h1>
            <Link to="/marcas/new" className="btn btn-primary">Crear Marca</Link>
            <div className="marca-list">
                {marcas.map((marca) => (
                    <MarcasCard marca={marca} key={marca.idmarcas} />
                ))}
            </div>
        </div>
    );
}

export default MarcasPage;
