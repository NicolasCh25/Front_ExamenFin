import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Especialidades from './pages/Especialidades';
import Citas from './pages/Citas';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 1. RUTA PÚBLICA */}
          <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pacientes" element={<Pacientes />} />
                  <Route path="/especialidades" element={<Especialidades />} />
                  <Route path="/citas" element={<Citas />} /></Route>
          
        

          {/* 2. PROTECCIÓN DE RUTAS */}
          <Route element={<ProtectedRoute />}>
              
              {/* 3. DISEÑO PRINCIPAL (LAYOUT) */}
              <Route element={<MainLayout />}>
                  {/* Si el usuario entra aquí, MainLayout pone el Navbar */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pacientes" element={<Pacientes />} />
                  <Route path="/especialidades" element={<Especialidades />} />
                  <Route path="/citas" element={<Citas />} />
              </Route>

          </Route>
          
          {/* 4. REDIRECCIÓN */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;