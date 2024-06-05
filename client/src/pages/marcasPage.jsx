// src/pages/marcasPage.jsx
import { useEffect } from 'react';
import { useMarcas } from '../context/marcasContext';
import MarcasCard from '../components/marcasCard';
import { Link } from 'react-router-dom';
import './page.css';

function MarcasPage() {
  const { marcas, loadMarcas, loading, error } = useMarcas();

  useEffect(() => {
    loadMarcas();
  }, []);

  if (loading) return <p>Cargando marcas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Marcas</h1>
      <Link to="/marcas/new"><button>Crear Marca</button></Link>
      {marcas.map((marca) => (
        <MarcasCard marca={marca} key={marca.idmarcas} />
      ))}
    </div>
  );
}

export default MarcasPage;
