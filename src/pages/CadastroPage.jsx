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
    <div className="form-container">
      <h2>Crie a sua conta</h2>

      <form>
        <div className="input-group">
          <label htmlFor="nome">Nome Completo</label>
          <span className="material-icons">person</span>
          <input
            type="text"
            id="nome"
            placeholder="João Pedro da Silva"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="usuario">Nome de usuário</label>
          <span className="material-icons">person</span>
          <input
            type="text"
            id="usuario"
            placeholder="joao_2002"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="celular">Celular para lembretes (com DDD)</label>
          <span className="material-icons">phone</span>
          <input
            type="tel"
            id="celular"
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <span className="material-icons">lock</span>
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

        <div className="input-group">
          <label htmlFor="confirmar-senha">Confirmar Senha</label>
          <span className="material-icons">lock</span>
          <input
            type={confirmPasswordType}
            id="confirmar-senha"
            placeholder="Repita a senha"
            required
          />
          <span
            className="material-icons toggle-password"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordType === "password" ? "visibility_off" : "visibility"}
          </span>
        </div>

        <button type="submit" className="btn-primary">
          CRIAR CONTA
        </button>
      </form>
    </div>
  );
}

export default CadastroPage;


