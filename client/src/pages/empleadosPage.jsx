import { useEffect, useState } from 'react';
import { getEmpleadosRequest } from '../api/empleados.api';
import EmpleadosCard from '../components/empleadosCard';

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEmpleados() {
      try {
        const response = await getEmpleadosRequest();
        if (response && response.data) {
          setEmpleados(response.data);
        } else {
          setError('No se pudieron cargar los datos de los empleados');
        }
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los empleados');
        setLoading(false);
      }
    }
    loadEmpleados();
  }, []);

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Empleados</h1>
      {empleados.map((empleado) => (
        <EmpleadosCard empleado={empleado} key={empleado.idempleados} />
      ))}
    </div>
  );
}

export default EmpleadosPage;
