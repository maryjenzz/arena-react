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
    <>
      <div id="imagem">
        <img src={logo} alt="Logo Arena Máfia" className="logo" />
      </div>

      <div id="informacoes">
        {/* Container para Email */}
        <div className="input-wrapper">
          <i className="fas fa-envelope"></i>
          <input type="email" className="input-field" placeholder="Insira seu E-mail" />
        </div>
        
        {/* Container para Senha */}
        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <div className="senha-container">
            <input
              type={passwordType}
              className="input-field"
              id="senha"
              placeholder="Insira sua senha"
            />
            <i
              className={`fas ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}
              id="toggleSenha"
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        
        {/* Esqueceu sua senha? */}
        <a href="#">Esqueci minha senha</a> 
      </div>

      <div id="button">
        <a className="button" href="#">FAZER LOGIN</a><br /> 
        <Link className="button" to="/cadastro">CRIAR CONTA</Link><br />
        <Link className="button" to="/">VOLTAR PARA HOMEPAGE</Link> 
      </div>
    </>
  );
}

export default LoginPage;