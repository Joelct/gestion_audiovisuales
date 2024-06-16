import { useEffect } from 'react';
import { useTecConexiones } from '../context/tec_conexionContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function TecConexionPage() {
  const { tecConexiones, loadTecConexiones, deleteTecConexion, loading, error } = useTecConexiones();
  const navigate = useNavigate();

  useEffect(() => {
    loadTecConexiones();
  }, []);

  if (loading) return <p>Cargando conexiones técnicas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Conexiones Técnicas</h1>
      <Link to="/tec_conexiones/new"><button>Crear Conexión Técnica</button></Link>
      {tecConexiones.map((tecConexion) => (
        <div className="card" key={tecConexion.idtec_conexion}>
          <h3>{tecConexion.tec_conexion_descrip}</h3>
          <p>Estado: {tecConexion.tec_conexion_estado}</p>
          <button onClick={() => navigate(`/tec_conexiones/${tecConexion.idtec_conexion}/edit`)}>Editar</button>
          <button onClick={() => deleteTecConexion(tecConexion.idtec_conexion)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default TecConexionPage;
