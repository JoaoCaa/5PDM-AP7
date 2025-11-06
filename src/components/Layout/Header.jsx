import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        ClassTask
      </Link>

      <nav className="header__nav">
        {currentUser ? (
          <>
            <Link to="/profile" className="header__button--green">
              Meu perfil
            </Link>
          </>
        ) : (
          <Link to="/login" className="header__link">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
