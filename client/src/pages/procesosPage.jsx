import { useState, useEffect } from 'react';
import { useProcesos } from '../context/procesosContext';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './page.css';
import './card.css';

function ProcesosPage() {
    const { procesos, loadProcesos, deleteProcesos, loading, error } = useProcesos();
    const [filtroNoPrestamo, setFiltroNoPrestamo] = useState('');
    const [filtroEmpleado, setFiltroEmpleado] = useState('');
    const [filtroEquipo, setFiltroEquipo] = useState('');
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroFecha_prestamo, setFiltroFecha_prestamo] = useState('');
    const [filtroFecha_devolucion, setFiltroFecha_devolucion] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadProcesos();
    }, []);

    const handleDelete = async (no_prestamo) => {
      try {
        await deleteProcesos(no_prestamo);
      } catch (error) {
        console.error('Error al eliminar el proceso:', error);
        alert('Error al eliminar el proceso. Por favor, inténtelo de nuevo.');
      }
    };

    const procesosFiltrados = procesos.filter((proceso) => {
      const cumpleFiltroNoPrestamo = proceso.no_prestamo.toString().includes(filtroNoPrestamo);
      const cumpleFiltroEmpleado = proceso.empleado.toLowerCase().includes(filtroEmpleado.toLowerCase());
      const cumpleFiltroEquipo = proceso.equipo.toLowerCase().includes(filtroEquipo.toLowerCase());
      const cumpleFiltroUsuario = proceso.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
      const cumpleFiltroFechaDesde = filtroFecha_prestamo ? moment(proceso.fecha_prestamo).isSame(moment(filtroFecha_prestamo)) : true;
      const cumpleFiltroFechaHasta = filtroFecha_devolucion ? moment(proceso.fecha_devolucion).isSame(moment(filtroFecha_devolucion)) : true;
      const cumpleFiltroEstado = proceso.estado.toLowerCase().includes(filtroEstado.toLowerCase());
  
      return cumpleFiltroNoPrestamo && cumpleFiltroEmpleado && cumpleFiltroEquipo && cumpleFiltroUsuario && cumpleFiltroEstado && cumpleFiltroFechaDesde && cumpleFiltroFechaHasta;
    });
  
    const generarPDF = () => {
      const doc = new jsPDF();
      const fechaActual = moment().format('YYYY-MM-DD');
      
      // Agregar la fecha de generación en la parte superior
      doc.text(`Fecha de reporte: ${fechaActual}`, 14, 15);
  
      const columns = ['No. Préstamo', 'Empleado', 'Equipo', 'Usuario', 'Fecha de prestamo', 'Fecha de devolución', 'Comentario', 'Estado'];
      const data = procesosFiltrados.map(proceso => [
        proceso.no_prestamo,
        proceso.empleado,
        proceso.equipo,
        proceso.usuario,
        moment.utc(proceso.fecha_prestamo).format('YYYY-MM-DD'),
        moment.utc(proceso.fecha_devolucion).format('YYYY-MM-DD'),
        proceso.comentario,
        proceso.estado
      ]);
  
      doc.autoTable({
        startY: 25,
        head: [columns],
        body: data,
      });
  
      // Guardar PDF
      doc.save(`ReporteProcesos_${fechaActual}.pdf`);
    };


    if (loading) return <p className="text-white">Cargando procesos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Procesos</h1>
              <div className="flex space-x-2">
              <Link to="/procesos/new">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                  Crear proceso
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
                value={filtroNoPrestamo}
                onChange={(e) => setFiltroNoPrestamo(e.target.value)}
                placeholder="Filtrar por No. de prestamo"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroEmpleado}
                onChange={(e) => setFiltroEmpleado(e.target.value)}
                placeholder="Filtrar por Empleado"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroEquipo}
                onChange={(e) => setFiltroEquipo(e.target.value)}
                placeholder="Filtrar por Equipo"
                className="px-4 py-2 rounded-md mb-2"
              />
              <input
                type="text"
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
                placeholder="Filtrar por Usuario"
                className="px-4 py-2 rounded-md mb-2"
              />
              <p className='text-white'>Fecha préstamo</p>
              <input
                type="date"
                value={filtroFecha_prestamo}
                onChange={(e) => setFiltroFecha_prestamo(e.target.value)}
                placeholder="Fecha prestamo"
                className="px-4 py-2 rounded-md mb-2"
              />
              <p className='text-white'>Fecha devolución</p>
              <input
                type="date"
                value={filtroFecha_devolucion}
                onChange={(e) => setFiltroFecha_devolucion(e.target.value)}
                placeholder="Fecha devolucion"
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
              {procesosFiltrados.map((proceso) => (
                <div key={proceso.no_prestamo} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-white mb-2"> No. Préstamo: {proceso.no_prestamo}</h3>
                  <p className="text-gray-400 mb-4">Empleado: {proceso.empleado}</p>
                  <p className="text-gray-400 mb-4">Equipo: {proceso.equipo}</p>
                  <p className="text-gray-400 mb-4">Usuario: {proceso.usuario}</p>
                  <p className="text-gray-400 mb-4">Fecha de préstamo: {moment.utc(proceso.fecha_prestamo).format('YYYY-MM-DD')}</p>
                  {/* <p className="text-gray-400 mb-4">Fecha de devolución: {moment.utc(proceso.fecha_devolucion).format('YYYY-MM-DD')}</p> */}
                  <p className="text-gray-400 mb-4">Fecha de devolución: {proceso.fecha_devolucion}</p>
                  <p className="text-gray-400 mb-4">Comentario: {proceso.comentario}</p>
                  <p className="text-gray-400 mb-4">Estado: {proceso.estado}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/procesos/${proceso.no_prestamo}/edit`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(proceso.no_prestamo)}
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
    
    export default ProcesosPage;