import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function MenuGestao() {
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
            <span>Arena Máfia</span>
            <i className="fas fa-chevron-down"></i>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <h1 className="page-title">
          Menu de Gestão <span>.</span>
        </h1>

        <div className="grid-menu">
          <Link to="/admin/modalidades" className="menu-button btn-primary">
            Modalidades
          </Link>

          <Link to="/admin/quadras" className="menu-button btn-primary">
            Quadras
          </Link>

          <Link to="/admin/horarios" className="menu-button btn-secondary">
            Horários
          </Link>

          <Link to="/admin/agenda" className="menu-button btn-secondary">
            Agenda
          </Link>

          <Link to="/admin/precos" className="menu-button btn-primary">
            Preços
          </Link>

          <button
            className="menu-button btn-outline"
            onClick={() => window.history.back()}
          >
            <i className="fas fa-arrow-left"></i>
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

export default MenuGestao;