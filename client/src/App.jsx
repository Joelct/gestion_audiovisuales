import { Routes, Route, Navigate } from 'react-router-dom';
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
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './context/authContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
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
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/empleados" element={<ProtectedRoute><EmpleadosPage /></ProtectedRoute>} />
                          <Route path="/empleados/new" element={<ProtectedRoute><EmpleadosForm /></ProtectedRoute>} />
                          <Route path="/empleados/edit/:id" element={<ProtectedRoute><EmpleadosForm /></ProtectedRoute>} />
                          <Route path="/marcas" element={<ProtectedRoute><MarcasPage /></ProtectedRoute>} />
                          <Route path="/marcas/new" element={<ProtectedRoute><MarcasForm /></ProtectedRoute>} />
                          <Route path="/marcas/edit/:id" element={<ProtectedRoute><MarcasForm /></ProtectedRoute>} />
                          <Route path="/equipos" element={<ProtectedRoute><EquiposPage /></ProtectedRoute>} />
                          <Route path="/equipos/new" element={<ProtectedRoute><EquiposForm /></ProtectedRoute>} />
                          <Route path="/equipos/edit/:id" element={<ProtectedRoute><EquiposForm /></ProtectedRoute>} />
                          <Route path="/modelos" element={<ProtectedRoute><ModelosPage /></ProtectedRoute>} />
                          <Route path="/modelos/new" element={<ProtectedRoute><ModelosForm /></ProtectedRoute>} />
                          <Route path="/modelos/:id/edit" element={<ProtectedRoute><ModelosForm /></ProtectedRoute>} />
                          <Route path="/tec_conexiones" element={<ProtectedRoute><TecConexionPage /></ProtectedRoute>} />
                          <Route path="/tec_conexiones/new" element={<ProtectedRoute><TecConexionForm /></ProtectedRoute>} />
                          <Route path="/tec_conexiones/:id/edit" element={<ProtectedRoute><TecConexionForm /></ProtectedRoute>} />
                          <Route path="/usuarios" element={<ProtectedRoute><UsuariosPage /></ProtectedRoute>} />
                          <Route path="/usuarios/new" element={<ProtectedRoute><UsuariosForm /></ProtectedRoute>} />
                          <Route path="/usuarios/:id/edit" element={<ProtectedRoute><UsuariosForm /></ProtectedRoute>} />
                          <Route path="/tipos_equipos" element={<ProtectedRoute><TiposEquiposPage /></ProtectedRoute>} />
                          <Route path="/tipos_equipos/new" element={<ProtectedRoute><TiposEquiposForm /></ProtectedRoute>} />
                          <Route path="/tipos_equipos/:id/edit" element={<ProtectedRoute><TiposEquiposForm /></ProtectedRoute>} />
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
    </AuthProvider>
  );
}

export default App;
