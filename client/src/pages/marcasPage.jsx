// src/pages/marcasPage.jsx
import { useEffect } from 'react';
import { useMarcas } from '../context/marcasContext';
import { Link, useNavigate } from 'react-router-dom';
import './page.css';
import './card.css';

function MarcasPage() {
  const { marcas, loadMarcas, deleteMarca, loading, error } = useMarcas();
  const navigate = useNavigate();

  useEffect(() => {
    loadMarcas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id);
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
    }
  };

  if (loading) return <p>Cargando marcas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Marcas</h1>
          <Link to="/marcas/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Marca
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {marcas.map((marca) => (
            <div key={marca.idmarcas} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">{marca.descripcion_marcas}</h3>
              <p className="text-gray-400 mb-4">Estado: {marca.estado_marcas}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/marcas/${marca.idmarcas}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(marca.idmarcas)}
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

export default MarcasPage;
