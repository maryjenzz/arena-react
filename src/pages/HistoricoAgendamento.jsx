import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import '../styles/historico.css';

function HistoricoAgendamento() {
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const usuario = JSON.parse(localStorage.getItem('user')) || {};

  const formatarDataExibicao = (dataStr) => {
    try {
      const [ano, mes, dia] = dataStr.split('-');
      return `${dia}/${mes}/${ano}`;
    } catch {
      return dataStr;
    }
  };

  const traduzirStatus = (status) => {
    if (status === 'CONFIRMED') return 'Confirmada';
    if (status === 'CANCELLED') return 'Cancelada';
    if (status === 'COMPLETED') return 'Realizada';
    return status || 'Pendente';
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmada':
      case 'Realizada':
      case 'Pago':
        return 'text-green';
      case 'Cancelada':
      case 'Não Pago':
        return 'text-red';
      default:
        return 'text-default';
    }
  };

  useEffect(() => {
    async function carregarReservas() {
      setCarregando(true);
      setErro('');

      try {
        const response = await apiFetch('/api/users/me/reservations?page=0&size=20');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.developerMessage || 'Erro ao carregar reservas.');
        }

        const reservasFormatadas = (data.content || []).map((reserva) => ({
          id: reserva.id,
          data: formatarDataExibicao(reserva.date),
          horario: `${reserva.timeInterval.startTime} - ${reserva.timeInterval.endTime}`,
          statusReserva: traduzirStatus(reserva.status),
          statusPagamento: 'Pago',
          valor: reserva.price?.toFixed(2).replace('.', ',') || '0,00',
        }));

        setHistorico(reservasFormatadas);
      } catch (error) {
        setErro(error.message || 'Erro ao carregar histórico.');
      } finally {
        setCarregando(false);
      }
    }

    carregarReservas();
  }, []);

  return (
    <div className="historico-container">
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
            <span>{usuario.fullName || usuario.fullname || usuario.username || 'Usuário'}</span>
            <i className="fas fa-chevron-down"></i>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      <main className="historico-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="historico-title">Histórico de Agendamento</h1>

        {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

        <div className="historico-table">
          <div className="historico-header">
            <div>Data</div>
            <div>Horário</div>
            <div>Status da reserva</div>
            <div>Status do pagamento</div>
            <div>Valor da reserva</div>
          </div>

          <div className="historico-list">
            {carregando ? (
              <p style={{ textAlign: 'center', color: '#999', fontWeight: 'bold' }}>
                Carregando reservas...
              </p>
            ) : historico.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', fontWeight: 'bold' }}>
                Nenhuma reserva encontrada.
              </p>
            ) : (
              historico.map((item) => (
                <div key={item.id} className="historico-pill">
                  <div className="col-data">{item.data}</div>

                  <div>{item.horario}</div>

                  <div className={`col-reserva ${getStatusClass(item.statusReserva)}`}>
                    {item.statusReserva}
                  </div>

                  <div className={`col-pagamento ${getStatusClass(item.statusPagamento)}`}>
                    {item.statusPagamento}
                  </div>

                  <div className="col-valor">
                    <span className="cifrao">R$</span> {item.valor}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoricoAgendamento;