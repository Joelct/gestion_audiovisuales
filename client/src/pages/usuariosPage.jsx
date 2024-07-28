import { useEffect } from 'react';
import { useUsuarios } from '../context/usuariosContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function UsuariosPage() {
  const { usuarios, loadUsuarios, deleteUsuario, loading, error } = useUsuarios();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este usuario?");
    if (confirmDelete) {
      try {
        await deleteUsuario(id);
        alert('Usuario eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert('Error al eliminar el usuario');
      }
    }
  };

  if (loading) return <p className="text-white">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <Link to="/usuarios/new">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Crear Usuario
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {usuarios.map((usuario) => (
            <div key={usuario.idusuarios} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-white mb-2">Id: {usuario.idusuarios}</h2>
              <h3 className="text-xl font-bold text-white mb-2">{usuario.nombre_usuario}</h3>
              <p className="text-gray-400 mb-2">Cédula: {usuario.cedula_usuario}</p>
              <p className="text-gray-400 mb-2">Número de Carnet: {usuario.no_carnet}</p>
              <p className="text-gray-400 mb-2">Tipo de Usuario: {usuario.tipo_usuario}</p>
              <p className="text-gray-400 mb-2">Tipo de Persona: {usuario.tipo_persona}</p>
              <p className="text-gray-400 mb-4">Estado: {usuario.estado_usuario}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/usuarios/${usuario.idusuarios}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.idusuarios)}
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

export default UsuariosPage;

