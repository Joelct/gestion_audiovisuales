// src/pages/usuariosPage.jsx
import { useEffect } from 'react';
import { useUsuarios } from '../context/usuariosContext';
import UsuariosCard from '../components/usuariosCard';
import { Link } from 'react-router-dom';

function UsuariosPage() {
  const { usuarios, loadUsuarios, loading, error } = useUsuarios();

  useEffect(() => {
    loadUsuarios();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>
      <Link to="/usuarios/new"><button>Crear Usuario</button></Link>
      {usuarios.map((usuario) => (
        <UsuariosCard usuario={usuario} key={usuario.idusuarios} />
      ))}
    </div>
  );
}

export default UsuariosPage;
