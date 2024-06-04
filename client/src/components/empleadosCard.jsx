import { deleteEmpleadoRequest } from "../api/empleados.api";

function EmpleadosCard({ empleado }) {

    const handleDelete = async (idempleados) => {
        try {
            const response = await deleteEmpleadoRequest(idempleados)
            console.log (response)
    } catch (error) {
        console.error(error)
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
        <button>Edit</button>
      </div>
    );
  }
  
  export default EmpleadosCard;
  