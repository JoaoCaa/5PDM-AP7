import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import Header from './components/Layout/Header'; 
import Login from './components/Auth/Login'; 
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
 
// Componente de Rota Protegida
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Se ainda estiver carregando, mostre um loading para evitar redirecionamento instantâneo
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Carregando autenticação...</p>
      </div>
    );
  }

  // Se o usuário não estiver logado, redireciona para a página de login
  return currentUser ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} /> 
          
          {/* Rota de Registro - Usando o componente Register dedicado */}
          {/* <Route path="/register" element={<Register />} />  */}

          {/* Rota Principal Protegida */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          
          {/* Rota de Perfil Protegida */}
          <Route
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
