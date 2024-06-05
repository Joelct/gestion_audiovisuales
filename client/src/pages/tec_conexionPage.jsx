// src/pages/tec_conexionPage.jsx
import { useEffect } from 'react';
import { useTecConexiones } from '../context/tec_conexionContext';
import TecConexionCard from '../components/tec_conexionCard';
import { Link } from 'react-router-dom';
import './page.css'

function TecConexionPage() {
  const { tecConexiones, loadTecConexiones, loading, error } = useTecConexiones();

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
        <TecConexionCard tecConexion={tecConexion} key={tecConexion.idtec_conexion} />
      ))}
    </div>
  );
}

export default TecConexionPage;
