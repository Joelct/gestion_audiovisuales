import { useEffect } from 'react';
import { useEquipos } from '../context/equiposContext';
import { deleteEquipoRequest } from '../api/equipos.api';
import { Link, useNavigate } from 'react-router-dom';
import './page.css';
import './card.css';

function EquiposPage() {
  const { equipos, loadEquipos, deleteEquipo, loading, error } = useEquipos();
  const navigate = useNavigate();

  useEffect(() => {
    loadEquipos();
  }, []);

  const handleDelete = async (idequipos) => {
    try {
      await deleteEquipoRequest(idequipos);
      deleteEquipo(idequipos);
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
    }
  };

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Equipos</h1>
          <div className="flex space-x-2">
            <Link to="/equipos/new">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                Crear Equipo
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {equipos.map((equipo) => (
            <div key={equipo.idequipos} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-2">ID: {equipo.idequipos}</h3>
              <p className="text-gray-400 mb-2">Descripción: {equipo.descripcion_equipos}</p>
              <p className="text-gray-400 mb-2">No. Serial: {equipo.no_serial}</p>
              <p className="text-gray-400 mb-2">Tag de servicio: {equipo.serv_tag}</p>
              <p className="text-gray-400 mb-2">Tipo de equipo: {equipo.tipo_equipo}</p>
              <p className="text-gray-400 mb-2">Descripción Marca: {equipo.descripcion_marca}</p>
              <p className="text-gray-400 mb-2">Descripción Modelo: {equipo.descripcion_modelo}</p>
              <p className="text-gray-400 mb-2">Tecnología Conexión: {equipo.tec_conexion_descrip}</p>
              <p className="text-gray-400 mb-4">Estado: {equipo.estado_equipos}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/equipos/edit/${equipo.idequipos}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(equipo.idequipos)}
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

export default EquiposPage;

