import { useEffect } from 'react';
import { useEquipos } from '../context/equiposContext';
import EquiposCard from '../components/equiposCard';
import { Link } from 'react-router-dom';
import './page.css'

function EquiposPage() {
  const { equipos, loadEquipos, loading, error } = useEquipos();

  useEffect(() => {
    loadEquipos();
  }, []);

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Equipos</h1>
      <Link to="/equipos/new"><button>Crear Equipo</button></Link>
      {equipos.map((equipo) => (
        <EquiposCard equipo={equipo} key={equipo.idequipos} />
      ))}
    </div>
  );
}

export default EquiposPage;
