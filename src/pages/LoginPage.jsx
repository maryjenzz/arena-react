import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoLobo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css';

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include', // necessário para receber o cookie refreshToken
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.developerMessage || 'Usuário ou senha inválidos.');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        userId: data.userId,
        username: data.username,
        fullname: data.fullname,
        phone: data.phone,
        role: data.role,
      }));

      if (data.role === 'ROLE_ADMIN') {
        navigate('/gestao');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="bg-logo-overlay">
        <img src={logoLobo} alt="Lobo" />
      </div>

      <div className="login-content">
        <h1 className="login-title">Faça seu login <span>.</span></h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuário</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Digite seu usuário"
                className="input-field"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="create-account-area">
          <Link to="/cadastro" className="create-link">
            Ainda não tenho uma conta
          </Link>
        </div>

        <Link to="/" className="back-arrow">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;