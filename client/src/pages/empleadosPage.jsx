import { useEffect } from 'react';
import { useEmpleados } from '../context/empleadosContext';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
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
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Empleados</h1>
          <Link to="/empleados/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Empleado
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {empleados.map((empleado) => (
            <div key={empleado.idempleados} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">ID: {empleado.idempleados}</h3>
              <p className="text-gray-400 mb-2">Nombre: {empleado.nombre_empleados}</p>
              <p className="text-gray-400 mb-2">Cédula: {empleado.cedula_empleados}</p>
              <p className="text-gray-400 mb-2">Tanda Laboral: {empleado.tanda_labor}</p>
              <p className="text-gray-400 mb-2">Fecha de Ingreso: {moment.utc(empleado.fecha_ingreso).format('YYYY-MM-DD')}</p>
              <p className="text-gray-400 mb-4">Estado: {empleado.estado_empleado}</p>
              <div className="flex justify-between">

                <button
                  onClick={() => navigate(`/empleados/edit/${empleado.idempleados}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(empleado.idempleados)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmpleadosPage;
