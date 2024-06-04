import axios from 'axios'

export const getEmpleadosRequest = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/empleados');
      return response;
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
      throw error;
    }
  };

export const crearEmpleadoRequest = async (empleados) => {
    await axios.post("http://localhost:3000/api/empleados", empleados);
}

export const deleteEmpleadoRequest = async (idempleados) =>
    await axios.delete(`http://localhost:3000/api/empleados/${idempleados}`);