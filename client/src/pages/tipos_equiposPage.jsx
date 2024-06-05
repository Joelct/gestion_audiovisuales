import { useEffect } from 'react';
import { useTiposEquipos } from '../context/tipos_equiposContext';
import TiposEquiposCard from '../components/tipos_equiposCard';
import { Link } from 'react-router-dom';
import './page.css'

function TiposEquiposPage() {
  const { tiposEquipos, loadTiposEquipos, loading, error } = useTiposEquipos();

  useEffect(() => {
    loadTiposEquipos();
  }, []);

  if (loading) return <p>Cargando tipos de equipos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Tipos de Equipos</h1>
      <Link to="/tipos_equipos/new"><button>Crear Tipo de Equipo</button></Link>
      {tiposEquipos.map((tipoEquipo) => (
        <TiposEquiposCard tipoEquipo={tipoEquipo} key={tipoEquipo.id_tipos_equipos} />
      ))}
    </div>
  );
}

export default TiposEquiposPage;
