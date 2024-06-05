import { useUsuarios } from '../context/usuariosContext';
import { useNavigate } from 'react-router-dom';
import './card.css';

function UsuariosCard({ usuario }) {
  const { deleteUsuario } = useUsuarios();
  const navigate = useNavigate();

  return (
    <div className="card">
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
  );
}

export default UsuariosCard;
