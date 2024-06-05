import { deleteEquipoRequest } from "../api/equipos.api";
import { useEquipos } from "../context/equiposContext";
import { useNavigate } from "react-router-dom";
import './card.css';

function EquiposCard({ equipo }) {
  const { deleteEquipo } = useEquipos();
  const navigate = useNavigate();

  const handleDelete = async (idequipos) => {
    try {
      await deleteEquipoRequest(idequipos);
      deleteEquipo(idequipos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <p>Id: {equipo.idequipos}</p>
      <p>Descripcion: {equipo.descripcion_equipos}</p>
      <p>No. Serial: {equipo.no_serial}</p>
      <p>Tag de servicio: {equipo.serv_tag}</p>
      <p>Tipo de equipo: {equipo.tipo_equipo}</p>
      <p>Descripcion Marca: {equipo.descripcion_marca}</p>
      <p>Descripcion Modelo: {equipo.descripcion_modelo}</p>
      <p> Tecnologia Conexion: {equipo.tec_conexion_descrip}</p>
      <p>Estado: {equipo.estado_equipos}</p>
      <button onClick={() => handleDelete(equipo.idequipos)}>Delete</button>
      <button onClick={() => navigate(`/equipos/edit/${equipo.idequipos}`)}>Edit</button>
    </div>
  );
}

export default EquiposCard;
