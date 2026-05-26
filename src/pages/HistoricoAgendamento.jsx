import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/historico.css';

function HistoricoAgendamento() {
  const navigate = useNavigate();

  // Dados temporários para visualização
  const historico = [
    { 
      data: "08/01/2026", 
      statusReserva: "Cancelada", 
      statusPagamento: "Cancelado", 
      valor: "0,00" 
    },
    { 
      data: "03/01/2026", 
      statusReserva: "Realizada", 
      statusPagamento: "Pago", 
      valor: "80,00" 
    },
    { 
      data: "15/12/2025", 
      statusReserva: "Cancelada", 
      statusPagamento: "Não Pago", 
      valor: "0,00" 
    }
  ];

  // Função para definir a cor do texto baseada no status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Realizada': case 'Pago': return 'text-green';
      case 'Cancelada': case 'Não Pago': return 'text-red';
      default: return 'text-default';
    }
  };

  return (
    <div className="historico-container">
      {/* Top Navbar */}
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
      <main className="historico-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="historico-title">Histórico de Agendamento</h1>

        <div className="historico-table">
          {/* Cabeçalho */}
          <div className="historico-header">
            <div>Data</div>
            <div>Status da reserva</div>
            <div>Status do pagamento</div>
            <div>Valor da reserva</div>
          </div>

          {/* Lista de Linhas */}
          <div className="historico-list">
            {historico.map((item, index) => (
              <div key={index} className="historico-pill">
                <div className="col-data">{item.data}</div>
                
                <div className={`col-reserva ${getStatusClass(item.statusReserva)}`}>
                  {item.statusReserva}
                </div>
                
                <div className={`col-pagamento ${getStatusClass(item.statusPagamento)}`}>
                  {item.statusPagamento}
                </div>
                
                <div className="col-valor">
                  <span className="cifrao">$</span> {item.valor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoricoAgendamento;