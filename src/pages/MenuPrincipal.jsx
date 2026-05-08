import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function MenuPrincipal() {
  return (
    <div className="dashboard-container">
      <nav className="top-navbar">
        <div className="nav-left">
          <Link to="/" className="nav-icon-link">
            <i className="fas fa-home"></i>
          </Link>
        </div>
        
        <div className="nav-right">
          <i className="fas fa-cog nav-icon"></i>
          <i className="fas fa-bell nav-icon"></i>
          <div className="nav-divider"></div>
          <div className="user-profile">
            <span>Usuário</span>
            <i className="fas fa-chevron-down"></i>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <h1 className="page-title">Menu Principal <span>.</span></h1>

        <div className="grid-menu">
          <Link to="/agendar" className="menu-button btn-primary">
            Agendar Horário
          </Link>
          
          <Link to="/perfil" className="menu-button btn-primary">
            Editar Perfil
          </Link>

          <Link to="/historico" className="menu-button btn-secondary">
            Histórico de agendamentos
          </Link>

          <Link to="/faq" className="menu-button btn-secondary">
            FAQ
          </Link>

          <Link to="/precos" className="menu-button btn-primary">
            Tabela de Preços
          </Link>

          <button className="menu-button btn-outline" onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

export default MenuPrincipal;