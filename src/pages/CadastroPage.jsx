import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import googleLogo from '../assets/imagens/logo-google.png';
import '../styles/cadastro.css'; // Importa o CSS de cadastro

function CadastroPage() {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
  };

  return (
    <body>
        <div id="button-google">
            <a className="button-google" href="">
                <img src={googleLogo} alt="Logo do google" className="logo-google" />
                Cadastre-se com o Google
            </a>
        </div>
        <div className="linha-divisoria"></div>
        <div id="titulo">
            <h1>Crie a sua conta</h1>
        </div>
        <div id="informacoes">
            <p><i className="fas fa-address-card"></i></p>
            <input type="text" className="input-cadastro" placeholder="Insira seu nome" />
            <p><i className="fas fa-phone"></i></p>
            <input type="number" className="input-cadastro" placeholder="Insira seu telefone" />
            <p><i className="fas fa-envelope"></i></p>
            <input type="email" className="input-cadastro" placeholder="Insira seu e-mail" />
            <p><i className="fas fa-lock"></i></p>
            <div className="senha-container">
                <input type={passwordType} className="input-cadastro senha-input" placeholder="Insira sua senha" />
                <i className={`fas ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
            </div>
            <p><i className="fas fa-lock"></i></p>
            <div className="senha-container">
                <input type={confirmPasswordType} className="input-cadastro senha-input" placeholder="Confirmar senha" />
                <i className={`fas ${confirmPasswordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleConfirmPasswordVisibility}></i>
            </div>
            <div id="button">
                <Link className="button" to="/">CADASTRAR</Link>
            </div>
        </div>
    </body>
  );
}

export default CadastroPage;