import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // ✅ adiciona o CSS moderno

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e, isRegister = false) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      if (isRegister) {
        await register(email, password);
        alert('Cadastro realizado com sucesso! Faça login.');
      } else {
        await login(email, password);
        navigate('/');
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('Usuário não encontrado.');
      else if (err.code === 'auth/wrong-password') setError('Senha incorreta.');
      else if (err.code === 'auth/email-already-in-use') setError('E-mail já cadastrado.');
      else setError('Falha na autenticação.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login__page">
      <div className="login__card">
        <h2 className="login__title">ClassTask</h2>
        <p className="login__subtitle">Entre ou cadastre-se para continuar</p>

        {error && <p className="login__error">{error}</p>}

        <form className="login__form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seuemail@exemplo.com"
          />

          <label>Senha (Pelo menos 6 caracteres)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <div className="login__buttons">
            <button
              onClick={(e) => handleSubmit(e, false)}
              disabled={isLoggingIn}
              className="login__btn login__btn--primary"
            >
              {isLoggingIn ? 'Entrando...' : 'Entrar'}
            </button>

            <button
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoggingIn}
              className="login__btn login__btn--secondary"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
