// src/components/modelosCard.jsx
import { useModelos } from '../context/modelosContext';
import { useNavigate } from 'react-router-dom';

function ModelosCard({ modelo }) {
  const { deleteModelo } = useModelos();
  const navigate = useNavigate();

  return (
    <div>
      <h3>{modelo.descripcion_modelo}</h3>
      <p>Estado: {modelo.estado_modelo}</p>
      <button onClick={() => navigate(`/modelos/${modelo.idmodelos}/edit`)}>Editar</button>
      <button onClick={() => deleteModelo(modelo.idmodelos)}>Eliminar</button>
    </div>
  );
}

export default ModelosCard;
