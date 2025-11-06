import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // ✅ Novo estilo

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      alert('Erro ao fazer logout.');
      console.error(e);
    }
  };

  if (!currentUser) {
    return <p className="profile__loading">Carregando informações...</p>;
  }

  return (
    <div className="profile">
      <h1 className="profile__title">👤 Meu Perfil</h1>

      <div className="profile__card">
        <p><strong>Status:</strong> {currentUser.emailVerified ? 'Verificado' : 'Não Verificado'}</p>
        <p><strong>E-mail:</strong> {currentUser.email}</p>
        <p><strong>UID:</strong> {currentUser.uid}</p>
        <p><strong>Criado em:</strong> {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
      </div>

      <button className="profile__logout" onClick={handleLogout}>
        Sair da Conta
      </button>
    </div>
  );
}

export default Profile;
