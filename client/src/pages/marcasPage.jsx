// src/pages/marcasPage.jsx
import { useEffect } from 'react';
import { useMarcas } from '../context/marcasContext';
import { Link, useNavigate } from 'react-router-dom';
import './page.css';
import './card.css';

function MarcasPage() {
  const { marcas, loadMarcas, deleteMarca, loading, error } = useMarcas();
  const navigate = useNavigate();

  useEffect(() => {
    loadMarcas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id);
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
    }
  };

  if (loading) return <p>Cargando marcas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Marcas</h1>
      <Link to="/marcas/new"><button>Crear Marca</button></Link>
      {marcas.map((marca) => (
        <div className="card" key={marca.idmarcas}>
          <h3>{marca.descripcion_marcas}</h3>
          <p>Estado: {marca.estado_marcas}</p>
          <button onClick={() => navigate(`/marcas/${marca.idmarcas}/edit`)}>Editar</button>
          <button onClick={() => handleDelete(marca.idmarcas)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default MarcasPage;
