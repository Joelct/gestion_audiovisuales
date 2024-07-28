// src/pages/tipos_equiposPage.jsx
import { useEffect } from 'react';
import { useTiposEquipos } from '../context/tipos_equiposContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function TiposEquiposPage() {
  const { tiposEquipos, loadTiposEquipos, deleteTipoEquipo, loading, error } = useTiposEquipos();
  const navigate = useNavigate();

  useEffect(() => {
    loadTiposEquipos();
  }, []);

  if (loading) return <p className="text-white">Cargando tipos de equipos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Tipos de Equipos</h1>
          <Link to="/tipos_equipos/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Tipo de Equipo
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tiposEquipos.map((tipoEquipo) => (
            <div key={tipoEquipo.id_tipos_equipos} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-white mb-2"> ID: {tipoEquipo.id_tipos_equipos}</h2>
              <h3 className="text-xl font-bold text-white mb-2">{tipoEquipo.tipos_equipos_descripcion}</h3>
              <p className="text-gray-400 mb-4">Estado: {tipoEquipo.tipos_equipos_estado}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/tipos_equipos/${tipoEquipo.id_tipos_equipos}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTipoEquipo(tipoEquipo.id_tipos_equipos)}
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

export default TiposEquiposPage;
