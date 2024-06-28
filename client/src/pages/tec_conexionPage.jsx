import { useEffect } from 'react';
import { useTecConexiones } from '../context/tec_conexionContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function TecConexionPage() {
  const { tecConexiones, loadTecConexiones, deleteTecConexion, loading, error } = useTecConexiones();
  const navigate = useNavigate();

  useEffect(() => {
    loadTecConexiones();
  }, []);

  if (loading) return <p className="text-white">Cargando conexiones técnicas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Conexiones Técnicas</h1>
          <Link to="/tec_conexiones/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Conexión Técnica
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tecConexiones.map((tecConexion) => (
            <div key={tecConexion.idtec_conexion} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">{tecConexion.descripcion_tec_conexion}</h3>
              <p className="text-gray-400 mb-4">Estado: {tecConexion.estado_tec_conexion}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/tec_conexiones/${tecConexion.idtec_conexion}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTecConexion(tecConexion.idtec_conexion)}
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

export default TecConexionPage;
