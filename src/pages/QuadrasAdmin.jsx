import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/quadrasAdmin.css';

function QuadrasAdmin() {
  const quadrasPadrao = [
    { id: 1, nome: 'Quadra 01', bloqueada: false },
    { id: 2, nome: 'Quadra 02', bloqueada: false },
  ];

  const [quadras, setQuadras] = useState([]);

  useEffect(() => {
    const salvas = localStorage.getItem('quadras');

    if (salvas) {
      setQuadras(JSON.parse(salvas));
    } else {
      localStorage.setItem('quadras', JSON.stringify(quadrasPadrao));
      setQuadras(quadrasPadrao);
    }
  }, []);

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

      <main className="quadras-admin-content">
        <Link to="/gestao" className="quadras-voltar-seta">
          <i className="fas fa-arrow-left"></i>
        </Link>

        <h1 className="quadras-admin-title">Quadras</h1>

        <div className="quadras-admin-lista">
          {quadras.map((quadra) => (
            <Link
              to={`/admin/quadras/editar/${quadra.id}`}
              className={`quadra-card ${quadra.bloqueada ? 'quadra-card-bloqueada' : ''}`}
              key={quadra.id}
            >
              <span>{quadra.nome}</span>
              <div className="quadra-hover">Editar</div>
            </Link>
          ))}

          <Link to="/admin/quadras/nova" className="quadra-card adicionar">
            <i className="fas fa-plus"></i>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default QuadrasAdmin;