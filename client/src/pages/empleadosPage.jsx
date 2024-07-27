import { useState, useEffect } from 'react';
import { useEmpleados } from '../context/empleadosContext';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './page.css';
import './card.css';

function EmpleadosPage() {
  const { empleados, loadEmpleados, deleteEmpleado, loading, error } = useEmpleados();
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroCedula, setFiltroCedula] = useState('');
  const [filtroTanda, setFiltroTanda] = useState('');
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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

  const empleadosFiltrados = empleados.filter((empleado) => {
    const cumpleFiltroNombre = empleado.nombre_empleados.toLowerCase().includes(filtroNombre.toLowerCase());
    const cumpleFiltroCedula = empleado.cedula_empleados.toLowerCase().includes(filtroCedula.toLowerCase());
    const cumpleFiltroTanda = empleado.tanda_labor.toLowerCase().includes(filtroTanda.toLowerCase());
    const cumpleFiltroEstado = empleado.estado_empleado.toLowerCase().includes(filtroEstado.toLowerCase());
    const cumpleFiltroFechaDesde = filtroFechaDesde ? moment(empleado.fecha_ingreso).isSameOrAfter(moment(filtroFechaDesde)) : true;
    const cumpleFiltroFechaHasta = filtroFechaHasta ? moment(empleado.fecha_ingreso).isSameOrBefore(moment(filtroFechaHasta)) : true;

    return cumpleFiltroNombre && cumpleFiltroCedula && cumpleFiltroTanda && cumpleFiltroEstado && cumpleFiltroFechaDesde && cumpleFiltroFechaHasta;
  });

  const generarPDF = () => {
    const doc = new jsPDF();
    const fechaActual = moment().format('YYYY-MM-DD');
    
    // Agregar la fecha de generación en la parte superior
    doc.text(`Fecha de generación: ${fechaActual}`, 14, 15);

    const columns = ['ID', 'Nombre', 'Cédula', 'Tanda', 'Fecha de ingreso', 'Estado'];
    const data = empleadosFiltrados.map(empleado => [
      empleado.idempleados,
      empleado.nombre_empleados,
      empleado.cedula_empleados,
      empleado.tanda_labor,
      moment.utc(empleado.fecha_ingreso).format('YYYY-MM-DD'),
      empleado.estado_empleado
    ]);

    doc.autoTable({
      startY: 25,
      head: [columns],
      body: data,
    });

    // Guardar PDF
    doc.save(`ReporteEmpleados_${fechaActual}.pdf`);
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Empleados</h1>
          <div className="flex space-x-2">
            <Link to="/empleados/new">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 mr-2">
                Crear Empleado
              </button>
            </Link>
            <button onClick={generarPDF} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
              Generar PDF
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700">
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-800 p-4 rounded-md mb-4">
            <div className="flex flex-wrap space-x-2 mb-4">
              <input
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                placeholder="Filtrar por nombre"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroCedula}
                onChange={(e) => setFiltroCedula(e.target.value)}
                placeholder="Filtrar por cédula"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroTanda}
                onChange={(e) => setFiltroTanda(e.target.value)}
                placeholder="Filtrar por tanda"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="date"
                value={filtroFechaDesde}
                onChange={(e) => setFiltroFechaDesde(e.target.value)}
                placeholder="Desde"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="date"
                value={filtroFechaHasta}
                onChange={(e) => setFiltroFechaHasta(e.target.value)}
                placeholder="Hasta"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                placeholder="Filtrar por estado"
                className="px-4 py-2 rounded-md mb-2"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {empleadosFiltrados.map((empleado) => (
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(empleado.idempleados)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-2"
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
