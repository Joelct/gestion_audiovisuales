import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmpleadosPage from './pages/empleadosPage';
import EmpleadosForm from './pages/empleadosForm';
import MarcasPage from './pages/marcasPage';
import MarcasForm from './pages/marcasForm';
import EquiposPage from './pages/equiposPage';
import EquiposForm from './pages/equiposForm';
import ModelosPage from './pages/modelosPage';
import ModelosForm from './pages/modelosForm';
import TecConexionPage from './pages/tec_conexionPage';
import TecConexionForm from './pages/tec_conexionForm';
import UsuariosPage from './pages/usuariosPage';
import UsuariosForm from './pages/usuariosForm';
import TiposEquiposPage from './pages/tipos_equiposPage';
import TiposEquiposForm from './pages/tipos_equiposForm';
import NotFound from './pages/notFound';
import Navbar from './components/Navbar';
import { EmpleadosContextProvider } from './context/empleadosContext';
import { MarcasContextProvider } from './context/marcasContext';
import { EquiposContextProvider } from './context/equiposContext';
import { ModelosProvider } from './context/modelosContext';
import { TecConexionProvider } from './context/tec_conexionContext';
import { UsuariosProvider } from './context/usuariosContext';
import { TiposEquiposProvider } from './context/tipos_equiposContext';
import './App.css';

function App() {
  return (
    <div className='bg-zinc-900 h-screen'>
    <Navbar />
    <div className='container mx-auto py-4'>
    <EmpleadosContextProvider>
      <MarcasContextProvider>
        <EquiposContextProvider>
          <ModelosProvider>
            <TecConexionProvider>
              <UsuariosProvider>
                <TiposEquiposProvider>
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
                    <Route path="/modelos" element={<ModelosPage />} />
                    <Route path="/modelos/new" element={<ModelosForm />} />
                    <Route path="/modelos/:id/edit" element={<ModelosForm />} />
                    <Route path="/tec_conexiones" element={<TecConexionPage />} />
                    <Route path="/tec_conexiones/new" element={<TecConexionForm />} />
                    <Route path="/tec_conexiones/:id/edit" element={<TecConexionForm />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/usuarios/new" element={<UsuariosForm />} />
                    <Route path="/usuarios/:id/edit" element={<UsuariosForm />} />
                    <Route path="/tipos_equipos" element={<TiposEquiposPage />} />
                    <Route path="/tipos_equipos/new" element={<TiposEquiposForm />} />
                    <Route path="/tipos_equipos/:id/edit" element={<TiposEquiposForm />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TiposEquiposProvider>
              </UsuariosProvider>
            </TecConexionProvider>
          </ModelosProvider>
        </EquiposContextProvider>
      </MarcasContextProvider>
    </EmpleadosContextProvider>
    </div>
    </div>
  );
}

export default App;
