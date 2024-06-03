import axios from 'axios'

export const crearEmpleadoRequest = async (empleados) => {
    await axios.post('http://localhost:3000/api/empleados', empleados)
}