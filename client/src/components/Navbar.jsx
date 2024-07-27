import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold">Inicio</Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link to="/empleados" className="text-white mx-2">Empleados</Link>
              <Link to="/marcas" className="text-white mx-2">Marcas</Link>
              <Link to="/equipos" className="text-white mx-2">Equipos</Link>
              <Link to="/modelos" className="text-white mx-2">Modelos</Link>
              <Link to="/tec_conexiones" className="text-white mx-2">Conexiones Técnicas</Link>
              <Link to="/usuarios" className="text-white mx-2">Usuarios</Link>
              <Link to="/tipos_equipos" className="text-white mx-2">Tipos de Equipos</Link>
              <Link to="/procesos" className="bg-yellow-500 text-black font-bold py-1 px-3 rounded mx-2 hover:bg-yellow-600 transition duration-300">Procesos</Link>
              <button onClick={logout} className="text-white mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">Login</Link>
              <Link to="/register" className="text-white mx-2">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// // src/components/Navbar.jsx
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   return (
//     <div className= "bg-zinc-700 justify-between px-10 py-2">
//         <h1 className="text-4xl text-gray-100 font-bold mb-6">Gestión Audiovisuales</h1>

//         <ul className="flex space-x-8">
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/">Home</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/empleados">Empleados</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/marcas">Marcas</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/equipos">Equipos</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/modelos">Modelos</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/tec_conexiones">Conexiones Técnicas</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/usuarios">Usuarios</Link>
//         </li>
//         <li className="text-2xl text-gray-400 mb-3">
//           <Link to="/tipos_equipos">Tipos de Equipos</Link>
//         </li>
//       </ul>
//     </div>

//   );
// }

// export default Navbar;
