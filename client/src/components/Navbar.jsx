import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
        <h1>Gestion audiovisuales</h1>

        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/new">Crear Empleado</Link>
            </li>
        </ul>
        

        </div>
    )
}

export default Navbar