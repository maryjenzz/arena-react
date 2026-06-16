import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import '../styles/horariosAdmin.css';

function HorariosAdmin() {
  const navigate = useNavigate();

  const hoje = new Date();

  const formatarDataChave = (date) => {
    const anoVal = date.getFullYear();
    const mesVal = String(date.getMonth() + 1).padStart(2, '0');
    const diaVal = String(date.getDate()).padStart(2, '0');
    return `${anoVal}-${mesVal}-${diaVal}`;
  };

  const formatarChaveProps = (anoVal, mesVal, diaVal) => {
    const m = String(mesVal + 1).padStart(2, '0');
    const d = String(diaVal).padStart(2, '0');
    return `${anoVal}-${m}-${d}`;
  };

  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [currentDate, setCurrentDate] = useState(hoje);
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const [diasBloqueados, setDiasBloqueados] = useState(() => {
    const salvas = localStorage.getItem('diasBloqueados');
    return salvas ? JSON.parse(salvas) : [];
  });

  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [reservaParaCancelar, setReservaParaCancelar] = useState(null);

  useEffect(() => {
    localStorage.setItem('diasBloqueados', JSON.stringify(diasBloqueados));
  }, [diasBloqueados]);

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const listaDias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const emptySpans = Array.from({ length: primeiroDiaSemana });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dataSelecionadaChave = formatarDataChave(dataSelecionada);
  const diaBloqueado = diasBloqueados.includes(dataSelecionadaChave);

  async function carregarAgendaAdmin() {
    setCarregando(true);
    setErro('');

    try {
      const response = await apiFetch(`/api/admin/agenda?date=${dataSelecionadaChave}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.developerMessage || 'Erro ao buscar agenda administrativa.');
      }

      const reservasFormatadas = data
        .filter((item) => item.type === 'SCHEDULE_DETAIL' && item.detail?.reservationId)
        .map((item) => {
          const detail = item.detail;

          return {
            id: detail.reservationId,
            usuario: detail.fullName || detail.username || 'Usuário',
            username: detail.username || '',
            telefone: detail.userPhone || 'Não informado',
            quadra: detail.courtName || detail.courtId || 'Quadra',
            horario: `${detail.timeInterval.startTime} - ${detail.timeInterval.endTime}`,
            modalidade: detail.modalityName || 'Modalidade',
            data: detail.date,
            status: detail.status,
            recurringReservationId: detail.recurringReservationId,
          };
        });

      setReservas(reservasFormatadas);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar reservas.');
      setReservas([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAgendaAdmin();
  }, [dataSelecionadaChave]);

  const prevMonth = () => {
    setCurrentDate(new Date(ano, mes - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(ano, mes + 1, 1));
  };

  function bloquearOuDesbloquearDia() {
    if (diaBloqueado) {
      setDiasBloqueados(diasBloqueados.filter((chave) => chave !== dataSelecionadaChave));
    } else {
      setDiasBloqueados([...diasBloqueados, dataSelecionadaChave]);
    }
  }

  function cancelarReserva(reserva) {
    setReservaParaCancelar(reserva);

    if (reserva.recurringReservationId) {
      setModalCancelarAberto(true);
    } else {
      const confirmar = window.confirm('Deseja cancelar esta reserva?');

      if (confirmar) {
        executarCancelamento(false, reserva);
      }
    }
  }

  async function executarCancelamento(cancelarRecorrentes, reservaRecebida = null) {
    const reserva = reservaRecebida || reservaParaCancelar;

    if (!reserva) return;

    try {
      const response = await apiFetch(
        `/api/admin/reservations/${reserva.id}/cancel?cancelAllRecurring=${cancelarRecorrentes}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        let data = null;

        try {
          data = await response.json();
        } catch {
          data = null;
        }

        throw new Error(data?.developerMessage || 'Erro ao cancelar reserva.');
      }

      alert('Reserva cancelada com sucesso!');
      setModalCancelarAberto(false);
      setReservaParaCancelar(null);
      carregarAgendaAdmin();
    } catch (error) {
      alert(error.message || 'Erro ao cancelar reserva.');
    }
  }

  return (
    <div className="horarios-admin-container">
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

      <main className="horarios-admin-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="horarios-admin-title">Horários</h1>

        <div className="calendario-admin-box">
          <div className="calendario-header">
            <button onClick={prevMonth} className="btn-seta-calendario">
              <i className="fas fa-chevron-left"></i>
            </button>

            <h3 className="mes-ano">{meses[mes]} {ano}</h3>

            <button onClick={nextMonth} className="btn-seta-calendario">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="dias-semana-header">
            <span>D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="dias-grid">
            {emptySpans.map((_, index) => (
              <span key={`empty-${index}`}></span>
            ))}

            {listaDias.map((dia) => {
              const chaveDia = formatarChaveProps(ano, mes, dia);
              const isSelected =
                dataSelecionada.getDate() === dia &&
                dataSelecionada.getMonth() === mes &&
                dataSelecionada.getFullYear() === ano;
              const isBlocked = diasBloqueados.includes(chaveDia);

              return (
                <button
                  key={dia}
                  className={`
                    dia-btn-admin
                    ${isSelected ? 'selected-glow-admin' : ''}
                    ${isBlocked ? 'dia-bloqueado-admin' : ''}
                  `}
                  onClick={() => setDataSelecionada(new Date(ano, mes, dia))}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        <div className="acoes-admin-horarios">
          <button
            type="button"
            className="btn-agendar-admin"
            onClick={() => navigate('/agendar')}
          >
            Agendar Horário
          </button>

          <button
            type="button"
            className={diaBloqueado ? 'btn-desbloquear-admin' : 'btn-bloquear-admin'}
            onClick={bloquearOuDesbloquearDia}
          >
            {diaBloqueado ? 'Desbloquear Dia' : 'Bloquear Dia'}
          </button>
        </div>

        <section className="reservas-admin-section">
          <h2>Reservas</h2>

          {erro && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
              {erro}
            </div>
          )}

          <div className="reservas-admin-header">
            <span>Usuário</span>
            <span>Telefone</span>
            <span>Quadra</span>
            <span>Horário</span>
            <span>Ações</span>
          </div>

          {carregando ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontWeight: 'bold' }}>
              Carregando reservas...
            </div>
          ) : reservas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontWeight: 'bold' }}>
              Nenhuma reserva para este dia.
            </div>
          ) : (
            reservas.map((reserva) => (
              <div className="reserva-admin-linha" key={reserva.id}>
                <span>
                  {reserva.usuario}
                  <br />
                  <small>{reserva.modalidade}</small>
                </span>

                <span>{reserva.telefone}</span>
                <span>{reserva.quadra}</span>
                <span>{reserva.horario}</span>

                <div className="reserva-admin-acoes">
                  <button
                    type="button"
                    className="btn-cancelar-admin"
                    onClick={() => cancelarReserva(reserva)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <button
          type="button"
          className="btn-salvar-admin-horarios"
          onClick={carregarAgendaAdmin}
        >
          Atualizar
        </button>
      </main>

      {modalCancelarAberto && (
        <div className="modal-reserva-fundo">
          <div
            className="modal-reserva-card"
            style={{
              border: '2px solid red',
              boxShadow: '0 0 35px rgba(255, 0, 0, 0.7)',
            }}
          >
            <button
              className="fechar-modal-reserva"
              onClick={() => {
                setModalCancelarAberto(false);
                setReservaParaCancelar(null);
              }}
            >
              <i className="fas fa-times"></i>
            </button>

            <h2>Cancelar Recorrência</h2>

            <p
              style={{
                color: 'white',
                marginBottom: '25px',
                fontSize: '0.95rem',
                lineHeight: '1.4',
              }}
            >
              Esta reserva faz parte de uma série recorrente. Como você deseja proceder?
            </p>

            <button
              className="btn-salvar-modal-reserva"
              onClick={() => executarCancelamento(false)}
              style={{ marginBottom: '12px', backgroundColor: '#333', border: '1px solid #555' }}
            >
              Cancelar apenas esta ocorrência
            </button>

            <button
              className="btn-salvar-modal-reserva"
              onClick={() => executarCancelamento(true)}
              style={{ backgroundColor: '#8B0000', border: '1px solid #ff4d4d' }}
            >
              Cancelar esta e todas as futuras
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HorariosAdmin;