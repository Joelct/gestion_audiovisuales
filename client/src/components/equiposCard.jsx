import { deleteEquipoRequest } from "../api/equipos.api";
import { useEquipos } from "../context/equiposContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <p>Id: {equipo.idequipos}</p>
      <p>{equipo.descripcion_equipo}</p>
      <p>{equipo.no_serial}</p>
      <p>{equipo.serv_tag}</p>
      <p>{equipo.tipo_equipo}</p>
      <p>{equipo.descripcion_marca}</p>
      <p>{equipo.descripcion_modelo}</p>
      <p>{equipo.tec_conexion_descrip}</p>
      <p>{equipo.estado_equipo}</p>
      <button onClick={() => handleDelete(equipo.idequipos)}>Delete</button>
      <button onClick={() => navigate(`/equipos/edit/${equipo.idequipos}`)}>Edit</button>
    </div>
  );
}

export default EquiposCard;
