import { deleteEmpleadoRequest } from "../api/empleados.api";
import { useEmpleados } from "../context/empleadosContext";
import { useNavigate } from "react-router-dom";
import './card.css';

function EmpleadosCard({ empleado }) {
  const { deleteEmpleado } = useEmpleados();
  const navigate = useNavigate();

  const handleDelete = async (idempleados) => {
    try {
      await deleteEmpleadoRequest(idempleados);
      deleteEmpleado(idempleados);
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      alert('Error al eliminar el empleado. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="card">
      <p>Id: {empleado.idempleados}</p>
      <p>{empleado.nombre_empleados}</p>
      <p>{empleado.cedula_empleados}</p>
      <p>{empleado.tanda_labor}</p>
      <p>{empleado.fecha_ingreso}</p>
      <p>{empleado.estado_empleado}</p>
      <button onClick={() => handleDelete(empleado.idempleados)}>Eliminar</button>
      <button onClick={() => navigate(`/empleados/edit/${empleado.idempleados}`)}>Editar</button>
    </div>
  );
}

export default EmpleadosCard;
