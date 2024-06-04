// MarcasCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { eliminarMarca } from '../api/marcas.api';
import { useMarcas } from '../context/marcasContext';

function MarcasCard({ marca }) {
    const { deleteMarca } = useMarcas();

    const handleDelete = async () => {
        try {
            await eliminarMarca(marca.idmarcas);
            deleteMarca(marca.idmarcas);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="marca-card">
            <h3>{marca.descripcion_marcas}</h3>
            <p>ID: {marca.idmarcas}</p>
            <p>Estado: {marca.estado_marcas}</p>
            <div className="buttons">
                <Link to={`/marcas/edit/${marca.idmarcas}`} className="btn btn-secondary">Editar</Link>
                <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    );
}

export default MarcasCard;
