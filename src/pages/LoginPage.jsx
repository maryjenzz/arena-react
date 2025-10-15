import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css'; // Importa o CSS de login

function LoginPage() {
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="login-page-container">
      <div id="titulo">
        <h1>Sejam bem-vindos</h1>
      </div>
      <div id="imagem">
        <img src={logo} alt="Logo Arena Máfia" className="logo" />
      </div>
      <div id="informacoes">
        <p><i className="fas fa-envelope"></i></p>
        <input type="email" className="input-login" placeholder="Insira seu e-mail" />
        <p><i className="fas fa-lock"></i></p>
        <div className="senha-container">
          <input
            type={passwordType}
            className="input-login"
            id="senha"
            placeholder="Insira sua senha"
          />
          <i
            className={`fas ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}
            id="toggleSenha"
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <a href="#">esqueci a minha senha</a><br />
      </div>
      <div id="button">
        <Link className="button" to="/">FAZER LOGIN</Link><br />
        <Link className="button" to="/cadastro">CRIAR CONTA</Link><br />
        <Link className="button" to="/">VOLTAR PARA HOMEPAGE</Link>
      </div>
    </div>
  );
}

export default LoginPage;