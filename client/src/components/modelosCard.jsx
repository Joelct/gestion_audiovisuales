import { useModelos } from '../context/modelosContext';
import { useNavigate } from 'react-router-dom';
import './card.css';

function ModelosCard({ modelo }) {
  const { deleteModelo } = useModelos();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteModelo(id);
    } catch (error) {
      console.error('Error al eliminar el modelo:', error);
    }
  };

  return (
    <div className="card">
      <h3>{modelo.descripcion_modelo}</h3>
      <p>Estado: {modelo.estado_modelo}</p>
      <button onClick={() => navigate(`/modelos/${modelo.idmodelos}/edit`)}>Editar</button>
      <button onClick={() => handleDelete(modelo.idmodelos)}>Eliminar</button>
    </div>
  );
}

export default ModelosCard;
