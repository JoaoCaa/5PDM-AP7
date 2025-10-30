import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Função para lidar com o logout, caso o usuário queira sair daqui
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      alert("Erro ao fazer logout.");
      console.error(e);
    }
  };
  
  // Exibe o carregamento enquanto o usuário é verificado
  if (!currentUser) {
      return <p>Carregando informações do perfil...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Meu Perfil</h1>
      
      <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
        **Status:** {currentUser.emailVerified ? 'Verificado' : 'Não Verificado'}
      </p>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <p>
          **E-mail (UID do Auth):** {currentUser.email}
        </p>
        <p>
          **UID do Firebase:** {currentUser.uid}
        </p>
        <p>
          **Criado em:** {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
        </p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
          {/* Opcional: Futuramente, adicione um formulário para atualizar o perfil */}
          {/* <button style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', marginRight: '10px', cursor: 'pointer' }}>
              Atualizar Perfil
          </button> */}
          <button 
            onClick={handleLogout}
            style={{ padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}
          >
              Sair da Conta
          </button>
      </div>
    </div>
  );
}

export default Profile;