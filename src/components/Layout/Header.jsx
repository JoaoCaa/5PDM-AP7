import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Importe o Link

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error("Falha ao fazer logout:", e);
    }
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#f8f8f8', borderBottom: '1px solid #eee' }}>
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
        React & Firebase App
      </Link>
      {currentUser ? (
        <nav>
          {/* Novo link para a página de perfil */}
          <Link to="/profile" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>
              Perfil
          </Link>
          <span style={{ marginRight: '15px' }}>Olá, {currentUser.email.split('@')[0]}!</span>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Sair
          </button>
        </nav>
      ) : (
        <nav>
           {/* Links para login/registro */}
           <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
           <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Cadastrar</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;