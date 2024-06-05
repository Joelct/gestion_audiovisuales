import { useEffect } from 'react';
import { useEmpleados } from '../context/empleadosContext';
import EmpleadosCard from '../components/empleadosCard';
import { Link } from 'react-router-dom';
import './page.css'

function EmpleadosPage() {
  const { empleados, loadEmpleados, loading, error } = useEmpleados();

  useEffect(() => {
    loadEmpleados();
  }, []);

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Empleados</h1>
      <Link to="/empleados/new"><button>Crear Empleado</button></Link>
      {empleados.map((empleado) => (
        <EmpleadosCard empleado={empleado} key={empleado.idempleados} />
      ))}
    </div>
  );
}

export default EmpleadosPage;
