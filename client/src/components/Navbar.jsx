// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <h1>Gestion Audiovisuales</h1>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/empleados">Empleados</Link>
        </li>
        <li>
          <Link to="/marcas">Marcas</Link>
        </li>
        <li>
          <Link to="/equipos">Equipos</Link>
        </li>
        <li>
          <Link to="/modelos">Modelos</Link>
        </li>
        <li>
          <Link to="/tec_conexiones">Conexiones Técnicas</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/tipos_equipos">Tipos de Equipos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
