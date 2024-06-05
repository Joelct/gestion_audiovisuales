import { useTecConexiones } from '../context/tec_conexionContext';
import { useNavigate } from 'react-router-dom';
import './card.css';

function TecConexionCard({ tecConexion }) {
  const { deleteTecConexion } = useTecConexiones();
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>{tecConexion.tec_conexion_descrip}</h3>
      <p>Estado: {tecConexion.tec_conexion_estado}</p>
      <button onClick={() => navigate(`/tec_conexiones/${tecConexion.idtec_conexion}/edit`)}>Editar</button>
      <button onClick={() => deleteTecConexion(tecConexion.idtec_conexion)}>Eliminar</button>
    </div>
  );
}

export default TecConexionCard;
