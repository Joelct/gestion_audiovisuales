// src/pages/usuariosPage.jsx
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

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Usuarios</h1>
      <Link to="/usuarios/new"><button>Crear Usuario</button></Link>
      {usuarios.map((usuario) => (
        <div className="card" key={usuario.idusuarios}>
          <h3>{usuario.nombre_usuario}</h3>
          <p>Id: {usuario.idusuarios}</p>
          <p>Cédula: {usuario.cedula_usuario}</p>
          <p>Número de Carnet: {usuario.no_carnet}</p>
          <p>Tipo de Usuario: {usuario.tipo_usuario}</p>
          <p>Tipo de Persona: {usuario.tipo_persona}</p>
          <p>Estado: {usuario.estado_usuario}</p>
          <button onClick={() => navigate(`/usuarios/${usuario.idusuarios}/edit`)}>Editar</button>
          <button onClick={() => deleteUsuario(usuario.idusuarios)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default UsuariosPage;

