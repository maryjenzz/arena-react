import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import logoLobo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css';

function LoginPage() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui futuramente você colocará a lógica de validação
    navigate('/dashboard'); // Redireciona para o Menu Principal
  };

  return (
    <div className="login-page-container">
      <div className="bg-logo-overlay">
        <img src={logoLobo} alt="Lobo" />
      </div>

      <div className="login-content">
        <h1 className="login-title">Faça seu login <span>.</span></h1>

        <form onSubmit={handleLogin}> {/* Adicionado onSubmit */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <input type="email" placeholder="email@exemplo.com" className="input-field" required />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <input type="password" placeholder="••••••••" className="input-field" required />
            </div>
          </div>

          <button type="submit" className="btn-entrar">Entrar</button>
        </form>

        <div className="create-account-area">
          <Link to="/cadastro" className="create-link">Ainda não tenho uma conta</Link>
        </div>
        <Link to="/" className="back-arrow">

          <i className="fas fa-arrow-left"></i>

        </Link>
      </div>
    </div>
  );
}

export default LoginPage;