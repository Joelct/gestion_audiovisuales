import { useEffect } from 'react';
import { useModelos } from '../context/modelosContext';
import { useNavigate, Link } from 'react-router-dom';
import './page.css';
import './card.css';

function ModelosPage() {
  const { modelos, loadModelos, deleteModelo, loading, error } = useModelos();
  const navigate = useNavigate();

  useEffect(() => {
    loadModelos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteModelo(id);
    } catch (error) {
      console.error('Error al eliminar el modelo:', error);
    }
  };

  if (loading) return <p>Cargando modelos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h1>Modelos</h1>
      <Link to="/modelos/new"><button>Crear Modelo</button></Link>
      {modelos.map((modelo) => (
        <div className="card" key={modelo.idmodelos}>
          <h3>{modelo.descripcion_modelo}</h3>
          <p>Estado: {modelo.estado_modelo}</p>
          <button onClick={() => navigate(`/modelos/${modelo.idmodelos}/edit`)}>Editar</button>
          <button onClick={() => handleDelete(modelo.idmodelos)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ModelosPage;
