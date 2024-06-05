// src/components/marcasCard.jsx
import { deleteMarcaRequest } from '../api/marcas.api';
import { useMarcas } from '../context/marcasContext';
import { useNavigate } from 'react-router-dom';
import './card.css';

function MarcasCard({ marca }) {
  const { deleteMarca } = useMarcas();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id);
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
    }
  };

  return (
    <div className="card">
      <h3>{marca.descripcion_marcas}</h3>
      <p>Estado: {marca.estado_marcas}</p>
      <button onClick={() => navigate(`/marcas/${marca.idmarcas}/edit`)}>Editar</button>
      <button onClick={() => handleDelete(marca.idmarcas)}>Eliminar</button>
    </div>
  );
}

export default MarcasCard;
