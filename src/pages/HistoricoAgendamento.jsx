import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/historico.css';

function HistoricoAgendamento() {
  const navigate = useNavigate();

  const obterPrecoReserva = (dataStr, horarioStr) => {
    try {
      const [ano, mes, dia] = dataStr.split('-').map(Number);
      const dateObj = new Date(ano, mes - 1, dia);
      const diaSemana = dateObj.getDay();

      const salvas = localStorage.getItem('precosAdmin');
      const precos = salvas ? JSON.parse(salvas) : {
        semana: { manha: '0,00', tarde: '0,00', noite: '80,00', tempo: '60min' },
        sabado: { manha: '0,00', tarde: '0,00', noite: '0,00', tempo: '60min' },
        domingo: { manha: '0,00', tarde: '0,00', noite: '80,00', tempo: '60min' },
      };

      let periodo = 'noite';
      if (horarioStr) {
        const horaInicio = parseInt(horarioStr.split(':')[0], 10);
        if (horaInicio < 12) {
          periodo = 'manha';
        } else if (horaInicio < 18) {
          periodo = 'tarde';
        }
      }

      if (diaSemana === 0) {
        return precos.domingo[periodo];
      } else if (diaSemana === 6) {
        return precos.sabado[periodo];
      } else {
        return precos.semana[periodo];
      }
    } catch (e) {
      return '80,00';
    }
  };

  const formatarDataExibicao = (dataStr) => {
    try {
      const [ano, mes, dia] = dataStr.split('-');
      return `${dia}/${mes}/${ano}`;
    } catch (e) {
      return dataStr;
    }
  };

  const reservasSalvas = JSON.parse(localStorage.getItem('reservas')) || [];
  const historico = reservasSalvas.map((reserva) => ({
    data: formatarDataExibicao(reserva.data),
    statusReserva: "Realizada",
    statusPagamento: "Pago",
    valor: obterPrecoReserva(reserva.data, reserva.horario),
  }));

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