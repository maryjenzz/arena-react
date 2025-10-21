import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css'; 

function LoginPage() {
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  
  return (
    // <--- NOVO CONTAINER DE ESCOPO
    <div className="login-page-container">
      <div id="imagem">
        <img src={logo} alt="Logo Arena Máfia" className="logo" />
      </div>

      <div id="informacoes">
        {/* Container para TELEFONE (Antigo Email) */}
        <div className="input-wrapper">
          {/* ÍCONE TELEFONE - Material Icons */}
          <span className="material-icons">phone</span> 
          <input type="tel" className="input-field" placeholder="Insira seu Celular" />
        </div>
        
        {/* Container para Senha */}
        <div className="input-wrapper">
          {/* ÍCONE CADEADO ESQUERDO - Material Icons */}
          <span className="material-icons">lock</span>
          <div className="senha-container">
            <input
              type={passwordType}
              className="input-field"
              id="senha"
              placeholder="Insira sua senha"
            />
            {/* ÍCONE TOGGLE - Material Icons */}
            <span
              className="material-icons"
              id="toggleSenha"
              onClick={togglePasswordVisibility}
            >
              {passwordType === 'password' ? 'visibility_off' : 'visibility'}
            </span>
          </div>
        </div>
        
        {/* Esqueceu sua senha? */}
        <a href="#">Esqueci minha senha</a> 
      </div>

      <div id="button">
        <a className="button" href="#">FAZER LOGIN</a>
        <Link className="button" to="/cadastro">CRIAR CONTA</Link>
        <Link className="button" to="/">VOLTAR</Link> 
      </div>
    </div>
    // ---> FIM DO CONTAINER DE ESCOPO
  );
}

export default LoginPage;