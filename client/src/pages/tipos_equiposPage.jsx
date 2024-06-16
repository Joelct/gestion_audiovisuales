// src/pages/tipos_equiposPage.jsx
import { useEffect } from 'react';
import { useTiposEquipos } from '../context/tipos_equiposContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function TiposEquiposPage() {
  const { tiposEquipos, loadTiposEquipos, deleteTipoEquipo, loading, error } = useTiposEquipos();
  const navigate = useNavigate();

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
        <div className="card" key={tipoEquipo.id_tipos_equipos}>
          <h3>{tipoEquipo.tipos_equipos_descripcion}</h3>
          <p>Estado: {tipoEquipo.tipos_equipos_estado}</p>
          <button onClick={() => navigate(`/tipos_equipos/${tipoEquipo.id_tipos_equipos}/edit`)}>Editar</button>
          <button onClick={() => deleteTipoEquipo(tipoEquipo.id_tipos_equipos)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default TiposEquiposPage;
