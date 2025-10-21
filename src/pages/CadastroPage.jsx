import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="cadastro-page-container">
    <div className="form-container">
      <h2>Crie a sua conta</h2>

      <form>
        <div className="input-group">
          <label htmlFor="nome">Nome Completo</label>
          <div className="input-content">
          <span className="material-icons icon">person</span>
          <input
            type="text"
            id="nome"
            placeholder="João Pedro da Silva"
            required
          />
        </div>
        </div>

        <div className="input-group">
          <label htmlFor="usuario">Nome de usuário</label>
          <div className="input-content">
          <span className="material-icons icon">person</span>
          <input
            type="text"
            id="usuario"
            placeholder="joao_2002"
            required
          />
        </div>
        </div>

        <div className="input-group">
          <label htmlFor="celular">Celular</label>
          <div className="input-content">
          <span className="material-icons icon">phone</span>
          <input
            type="tel"
            id="celular"
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <div className="input-content">
          <span className="material-icons icon">lock</span>
          <input
            type={passwordType}
            id="senha"
            placeholder="Digite sua senha"
            required
          />
          <span
            className="material-icons toggle-password"
            onClick={togglePasswordVisibility}
          >
            {passwordType === "password" ? "visibility_off" : "visibility"}
          </span>
        </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirmar-senha">Confirmar Senha</label>
          <div className="input-content">
          <span className="material-icons icon">lock</span>
          <input
            type={confirmPasswordType}
            id="confirmar-senha"
            placeholder="Confirmar senha"
            required
          />
          <span
            className="material-icons toggle-password"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordType === "password" ? "visibility_off" : "visibility"}
          </span>
        </div>
        </div>

        <button type="submit" className="btn-primary">
          CRIAR CONTA
        </button>
        <Link to="/login" className="link-login-extra">FAZER LOGIN</Link>
        </form>
      </div>
    </div>
  );
}

export default CadastroPage;