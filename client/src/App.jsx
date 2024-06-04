import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmpleadosPage from './pages/empleadosPage';
import EmpleadosForm from './pages/empleadosForm';
import MarcasPage from './pages/marcasPage';
import MarcasForm from './pages/marcasForm';
import EquiposPage from './pages/equiposPage';
import EquiposForm from './pages/equiposForm';
import NotFound from './pages/notFound';
import Navbar from './components/Navbar';
import { EmpleadosContextProvider } from './context/empleadosContext';
import { MarcasContextProvider } from './context/marcasContext';
import { EquiposContextProvider } from './context/equiposContext';

function App() {
  return (
    <EmpleadosContextProvider>
      <MarcasContextProvider>
        <EquiposContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empleados" element={<EmpleadosPage />} />
            <Route path="/empleados/new" element={<EmpleadosForm />} />
            <Route path="/empleados/edit/:id" element={<EmpleadosForm />} />
            <Route path="/marcas" element={<MarcasPage />} />
            <Route path="/marcas/new" element={<MarcasForm />} />
            <Route path="/marcas/edit/:id" element={<MarcasForm />} />
            <Route path="/equipos" element={<EquiposPage />} />
            <Route path="/equipos/new" element={<EquiposForm />} />
            <Route path="/equipos/edit/:id" element={<EquiposForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EquiposContextProvider>
      </MarcasContextProvider>
    </EmpleadosContextProvider>
  );
}

export default App;
