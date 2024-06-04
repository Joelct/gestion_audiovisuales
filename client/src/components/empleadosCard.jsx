import { deleteEmpleadoRequest } from "../api/empleados.api";
import { useEmpleados } from "../context/empleadosContext";
import { useNavigate } from "react-router-dom";

function EmpleadosCard({ empleado }) {
  const { deleteEmpleado } = useEmpleados();
  const navigate = useNavigate();

  const handleDelete = async (idempleados) => {
    try {
      await deleteEmpleadoRequest(idempleados);
      deleteEmpleado(idempleados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>Id: {empleado.idempleados}</p>
      <p>{empleado.nombre_empleados}</p>
      <p>{empleado.cedula_empleados}</p>
      <p>{empleado.tanda_labor}</p>
      <p>{empleado.fecha_ingreso}</p>
      <p>{empleado.estado_empleado}</p>
      <button onClick={() => handleDelete(empleado.idempleados)}>Delete</button>
      <button onClick={() => navigate(`/empleados/edit/${empleado.idempleados}`)}>Edit</button>
    </div>
  );
}

export default EmpleadosCard;
