import { Routes, Route } from 'react-router-dom';
import EmpleadosPage from './pages/empleadosPage';
import EmpleadosForm from './pages/empleadosForm';
import NotFound from './pages/notFound';
import { EmpleadosContextProvider } from './context/empleadosContext';

import Navbar from './components/Navbar';

function App() {
  return (
    <EmpleadosContextProvider>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<EmpleadosPage />} />
        <Route path="/new" element={<EmpleadosForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </EmpleadosContextProvider>
  );
}

export default App;
