import { useEffect } from 'react';
import { useProcesos } from '../context/procesosContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function ProcesosPage() {
    const { procesos, loadProcesos, deleteProcesos, loading, error } = useProcesos();
    const navigate = useNavigate();

    useEffect(() => {
        loadProcesos();
    }, []);

    if (loading) return <p className="text-white">Cargando procesos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <div className="min-h-screen bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Procesos</h1>
              <Link to="/procesos/new">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                  Crear proceso
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {procesos.map((proceso) => (
                <div key={proceso.no_prestamo} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-white mb-2">{proceso.comentario}</h3>
                  <p className="text-gray-400 mb-4">Estado: {proceso.estado}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/tec_conexiones/${proceso.no_prestamo}/edit`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProcesos(proceso.no_prestamo)}
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