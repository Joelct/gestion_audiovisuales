import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Gestión Audiovisuales</h1>
      <ul>
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
      </ul>
    </div>
  );
}

export default Navbar;
