// src/pages/modelosPage.jsx
import { useEffect } from 'react';
import { useModelos } from '../context/modelosContext';
import ModelosCard from '../components/modelosCard';
import { Link } from 'react-router-dom';
import './page.css'

function ModelosPage() {
  const { modelos, loadModelos, loading, error } = useModelos();

  useEffect(() => {
    loadModelos();
  }, []);

  if (loading) return <p>Cargando modelos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Modelos</h1>
      <Link to="/modelos/new"><button>Crear Modelo</button></Link>
      {modelos.map((modelo) => (
        <ModelosCard modelo={modelo} key={modelo.idmodelos} />
      ))}
    </div>
  );
}

export default ModelosPage;
