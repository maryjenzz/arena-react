import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/precos.css'; // Arquivo CSS que criaremos abaixo

function TabelaPrecos() {
  const navigate = useNavigate();

  // Dados estruturados conforme a imagem fornecida
  const precosData = [
    { dia: "Segunda à Sexta", manha: "0,00", tarde: "0,00", noite: "80,00", tempo: "60 min" },
    { dia: "Sábados", manha: "0,00", tarde: "0,00", noite: "0,00", tempo: "60 min" },
    { dia: "Domingos e Feriados", manha: "0,00", tarde: "0,00", noite: "80,00", tempo: "60 min" },
    { dia: "Segunda à Sexta", manha: "0,00", tarde: "0,00", noite: "80,00", tempo: "60 min" }
  ];

  return (
    <div className="precos-container">
      {/* Navbar padrão */}
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

      {/* Conteúdo Principal */}
      <main className="precos-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="precos-title">Tabela de Preços</h1>

        <div className="tabela-wrapper">
          {/* Cabeçalho da Tabela */}
          <div className="tabela-header">
            <div className="col-dia"></div> {/* Espaço vazio acima dos dias */}
            <div className="col-valor">Manhã</div>
            <div className="col-valor">Tarde</div>
            <div className="col-valor">Noite</div>
            <div className="col-tempo">Tempo</div>
          </div>

          {/* Linhas de Dados */}
          <div className="tabela-body">
            {precosData.map((item, index) => (
              <div key={index} className="tabela-linha">
                <div className="col-dia dia-texto">{item.dia}</div>
                
                <div className="col-valor valor-texto">
                  <span className="cifrao">$</span> {item.manha}
                </div>
                
                <div className="col-valor valor-texto">
                  <span className="cifrao">$</span> {item.tarde}
                </div>
                
                <div className="col-valor valor-texto">
                  <span className="cifrao">$</span> {item.noite}
                </div>
                
                <div className="col-tempo tempo-texto">{item.tempo}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TabelaPrecos;