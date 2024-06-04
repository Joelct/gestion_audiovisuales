function EmpleadosCard({ empleado }) {
    return (
      <div>
        <p>Id: {empleado.idempleados}</p>
        <p>{empleado.nombre_empleados}</p>
        <p>{empleado.cedula_empleados}</p>
        <p>{empleado.tanda_labor}</p>
        <p>{empleado.fecha_ingreso}</p>
        <p>{empleado.estado_empleado}</p>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    );
  }
  
  export default EmpleadosCard;
  