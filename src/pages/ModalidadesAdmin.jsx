import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/modalidadesAdmin.css';

function ModalidadesAdmin() {
  const modalidadesPadrao = [
    { id: 1, nome: 'Beach Tennis', icone: 'fas fa-table-tennis' },
    { id: 2, nome: 'Futevôlei', icone: 'fas fa-futbol' },
    { id: 3, nome: 'Vôlei de Praia', icone: 'fas fa-volleyball-ball' },
  ];

  const [modalidades, setModalidades] = useState([]);

  useEffect(() => {
    const salvas = localStorage.getItem('modalidades');

    if (salvas) {
      setModalidades(JSON.parse(salvas));
    } else {
      localStorage.setItem('modalidades', JSON.stringify(modalidadesPadrao));
      setModalidades(modalidadesPadrao);
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

      <main className="modalidades-admin-content">
        <Link to="/gestao" className="voltar-seta">
          <i className="fas fa-arrow-left"></i>
        </Link>

        <h1 className="modalidades-admin-title">Modalidades</h1>

        <div className="modalidades-admin-lista">
          {modalidades.map((modalidade) => (
            <Link
              to={`/admin/modalidades/editar/${modalidade.id}`}
              className="modalidade-item"
              key={modalidade.id}
            >
              <div className="modalidade-circulo">
                <i className={modalidade.icone}></i>
                <div className="modalidade-hover">Editar</div>
              </div>

              <p>{modalidade.nome}</p>
            </Link>
          ))}

          <Link to="/admin/modalidades/nova" className="modalidade-item">
            <div className="modalidade-circulo adicionar">
              <i className="fas fa-plus"></i>
            </div>

            <p>Nova modalidade</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ModalidadesAdmin;