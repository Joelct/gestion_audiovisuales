import { useEffect } from 'react';
import { useModelos } from '../context/modelosContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function ModelosPage() {
  const { modelos, loadModelos, deleteModelo, loading, error } = useModelos();
  const navigate = useNavigate();

  useEffect(() => {
    loadModelos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteModelo(id);
    } catch (error) {
      console.error('Error al eliminar el modelo:', error);
    }
  };

  if (loading) return <p className="text-white">Cargando modelos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Modelos</h1>
          <Link to="/modelos/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Modelo
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modelos.map((modelo) => (
            <div key={modelo.idmodelos} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">{modelo.descripcion_modelo}</h3>
              <p className="text-gray-400 mb-4">Estado: {modelo.estado_modelo}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/modelos/${modelo.idmodelos}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(modelo.idmodelos)}
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

export default ModelosPage;
