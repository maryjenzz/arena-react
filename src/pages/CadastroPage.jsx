import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoLobo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css';

function CadastroPage() {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  return (
    <div className="login-page-container">
      <div className="bg-logo-overlay">
        <img src={logoLobo} alt="Arena Máfia Logo" />
      </div>

      <div className="login-content">
        <h1 className="login-title">Crie sua conta <span>.</span></h1>

        <form>
          <div className="form-group">
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <input type="text" placeholder="João Pedro da Silva" className="input-field" required />
            </div>
          </div>

          <div className="form-group">
            <label>Nome de usuário</label>
            <div className="input-wrapper">
              <input type="text" placeholder="joao_2002" className="input-field" required />
            </div>
          </div>

          <div className="form-group">
            <label>Celular</label>
            <div className="input-wrapper">
              <input type="tel" placeholder="(XX) XXXXX-XXXX" className="input-field" required />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <input type={passwordType} placeholder="Digite sua senha" className="input-field" required />
            </div>
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <div className="input-wrapper">
              <input type={confirmPasswordType} placeholder="Confirmar senha" className="input-field" required />
            </div>
          </div>

          <button type="submit" className="btn-entrar">CRIAR CONTA</button>

          <div className="create-account-area">
            <Link to="/login" className="create-link">Já tem uma conta? Fazer login.</Link>
          </div>
        </form>

        <Link to="/" className="back-arrow">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
}

export default CadastroPage;