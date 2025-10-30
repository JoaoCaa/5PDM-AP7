import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Para desabilitar o botão
  
  const { login, register } = useAuth(); // Pega as funções de login/register do Context
  const navigate = useNavigate();

  const handleSubmit = async (e, isRegister = false) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      if (isRegister) {
        await register(email, password);
        alert('Cadastro realizado com sucesso! Faça login.'); // Mensagem simples
      } else {
        await login(email, password);
        navigate('/'); // Redireciona para a página inicial após o login
      }
    } catch (err) {
      // Mensagens de erro simples baseadas no Firebase
      if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado. Tente se cadastrar.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('E-mail já cadastrado. Tente fazer login.');
      }
       else {
        setError('Falha na autenticação. Verifique suas credenciais.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login / Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={(e) => handleSubmit(e, false)}
          disabled={isLoggingIn}
          style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
        >
          {isLoggingIn ? 'Entrando...' : 'Entrar'}
        </button>
         <button
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoggingIn}
          style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', cursor: 'pointer' }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Login;