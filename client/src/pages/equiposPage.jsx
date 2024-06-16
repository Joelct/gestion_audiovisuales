import { useEffect } from 'react';
import { useEquipos } from '../context/equiposContext';
import { Link, useNavigate } from 'react-router-dom';
import './page.css';
import './card.css';

function EquiposPage() {
  const { equipos, loadEquipos, deleteEquipo, loading, error } = useEquipos();
  const navigate = useNavigate();

  useEffect(() => {
    loadEquipos();
  }, []);

  const handleDelete = async (idequipos) => {
    try {
      await deleteEquipoRequest(idequipos);
      deleteEquipo(idequipos);
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
    }
  };

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Equipos</h1>
      <Link to="/equipos/new">
        <button>Crear Equipo</button>
      </Link>
      {equipos.map((equipo) => (
        <div className="card" key={equipo.idequipos}>
          <p>Id: {equipo.idequipos}</p>
          <p>Descripción: {equipo.descripcion_equipos}</p>
          <p>No. Serial: {equipo.no_serial}</p>
          <p>Tag de servicio: {equipo.serv_tag}</p>
          <p>Tipo de equipo: {equipo.tipo_equipo}</p>
          <p>Descripción Marca: {equipo.descripcion_marca}</p>
          <p>Descripción Modelo: {equipo.descripcion_modelo}</p>
          <p>Tecnología Conexión: {equipo.tec_conexion_descrip}</p>
          <p>Estado: {equipo.estado_equipos}</p>
          <button onClick={() => handleDelete(equipo.idequipos)}>Eliminar</button>
          <button onClick={() => navigate(`/equipos/edit/${equipo.idequipos}`)}>Editar</button>
        </div>
      ))}
    </div>
  );
}

export default EquiposPage;

