import { useEffect } from 'react';
import { useEmpleados } from '../context/empleadosContext';
import { Link, useNavigate } from 'react-router-dom';
import './page.css';
import './card.css';

function EmpleadosPage() {
  const { empleados, loadEmpleados, deleteEmpleado, loading, error } = useEmpleados();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmpleados();
  }, []);

  const handleDelete = async (idempleados) => {
    try {
      await deleteEmpleado(idempleados);
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      alert('Error al eliminar el empleado. Por favor, inténtelo de nuevo.');
    }
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1 className='text-3xl text-white font bold text-center'>Empleados</h1>
      <Link to="/empleados/new"><button>Crear Empleado</button></Link>
      {empleados.map((empleado) => (
        <div className='bg-slate-300'>
        <div className="grid grid-cols-3" key={empleado.idempleados}>
          <p>Id: {empleado.idempleados}</p>
          <p>{empleado.nombre_empleados}</p>
          <p>{empleado.cedula_empleados}</p>
          <p>{empleado.tanda_labor}</p>
          <p>{empleado.fecha_ingreso}</p>
          <p>{empleado.estado_empleado}</p>
          <button onClick={() => handleDelete(empleado.idempleados)}>Eliminar</button>
          <button onClick={() => navigate(`/empleados/edit/${empleado.idempleados}`)}>Editar</button>
        </div>
      </div>
      ))}
    </div>
  );
}

export default EmpleadosPage;
