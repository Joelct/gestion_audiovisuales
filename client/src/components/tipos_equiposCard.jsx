// src/components/tipos_equiposCard.jsx
import { useTiposEquipos } from '../context/tipos_equiposContext';
import { useNavigate } from 'react-router-dom';

function TiposEquiposCard({ tipoEquipo }) {
  const { deleteTipoEquipo } = useTiposEquipos();
  const navigate = useNavigate();

  return (
    <div>
      <h3>{tipoEquipo.tipos_equipos_descripcion}</h3>
      <p>Estado: {tipoEquipo.tipos_equipos_estado}</p>
      <button onClick={() => navigate(`/tipos_equipos/${tipoEquipo.id_tipos_equipos}/edit`)}>Editar</button>
      <button onClick={() => deleteTipoEquipo(tipoEquipo.id_tipos_equipos)}>Eliminar</button>
    </div>
  );
}

export default TiposEquiposCard;
