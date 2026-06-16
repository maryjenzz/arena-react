import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import '../styles/agendar.css';

function AgendarHorario() {
  const navigate = useNavigate();

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const [modalidades, setModalidades] = useState([]);
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState('');

  const [slots, setSlots] = useState([]);
  const [quadraSelecionada, setQuadraSelecionada] = useState('');
  const [slotSelecionado, setSlotSelecionado] = useState(null);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const usuario = JSON.parse(localStorage.getItem('user')) || {};

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const listaDias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const emptySpans = Array.from({ length: primeiroDiaSemana });

  const modalidadeAtual = modalidades.find((m) => m.id === modalidadeSelecionada);

  const quadrasDisponiveis = [...new Set(slots.map((slot) => slot.courtId))];

  const horariosFiltrados = quadraSelecionada
    ? slots.filter((slot) => slot.courtId === quadraSelecionada)
    : slots;

  function formatarDataISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  function obterNomeQuadra(courtId) {
    const index = quadrasDisponiveis.indexOf(courtId);
    return index >= 0 ? `Quadra ${index + 1}` : 'Quadra';
  }

  useEffect(() => {
    async function carregarModalidades() {
      try {
        const response = await apiFetch('/api/public/modalities');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.developerMessage || 'Erro ao carregar modalidades.');
        }

        setModalidades(data);

        if (data.length > 0) {
          setModalidadeSelecionada(data[0].id);
        }
      } catch (error) {
        setErro(error.message || 'Erro ao carregar modalidades.');
      }
    }

    carregarModalidades();
  }, []);

  useEffect(() => {
    async function carregarHorarios() {
      if (!modalidadeSelecionada || !dataSelecionada) return;

      setCarregando(true);
      setErro('');
      setSlotSelecionado(null);
      setQuadraSelecionada('');

      try {
        const date = formatarDataISO(dataSelecionada);

        const response = await apiFetch(
          `/api/schedules/available-slots?modalityId=${modalidadeSelecionada}&date=${date}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.developerMessage || 'Erro ao carregar horários.');
        }

        setSlots(data);

        if (data.length > 0) {
          setQuadraSelecionada(data[0].courtId);
        }
      } catch (error) {
        setErro(error.message || 'Erro ao carregar horários.');
        setSlots([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarHorarios();
  }, [modalidadeSelecionada, dataSelecionada]);

  const prevMonth = () => {
    setCurrentDate(new Date(ano, mes - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(ano, mes + 1, 1));
  };

  const handleSelecionarQuadra = (courtId) => {
    setQuadraSelecionada(courtId);
    setSlotSelecionado(null);
  };

  const handleConfirmar = async () => {
    if (!modalidadeSelecionada) {
      alert('Selecione uma modalidade.');
      return;
    }

    if (!quadraSelecionada) {
      alert('Selecione uma quadra.');
      return;
    }

    if (!slotSelecionado) {
      alert('Selecione um horário.');
      return;
    }

    try {
      const date = formatarDataISO(dataSelecionada);

      const response = await apiFetch('/api/users/me/reservations', {
        method: 'POST',
        body: JSON.stringify({
          modalityId: modalidadeSelecionada,
          courtId: slotSelecionado.courtId,
          date,
          timeInterval: {
            startTime: slotSelecionado.timeInterval.startTime,
            endTime: slotSelecionado.timeInterval.endTime,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.developerMessage || 'Erro ao criar reserva.');
      }

      alert('Agendamento confirmado com sucesso!');
      navigate('/historico');
    } catch (error) {
      alert(error.message || 'Erro ao confirmar agendamento.');
    }
  };

  return (
    <div className="agendar-container">
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

      <main className="agendar-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="agendar-title">Agendar Horário</h1>
        <p className="agendar-subtitle">
          Selecione a data, modalidade, quadra e horário para realizar seu agendamento.
        </p>

        {erro && <p style={{ color: 'red', marginBottom: '15px' }}>{erro}</p>}

        <div className="calendario-box">
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
            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
          </div>

          <div className="dias-grid">
            {emptySpans.map((_, index) => (
              <span key={`empty-${index}`}></span>
            ))}

            {listaDias.map((dia) => {
              const isSelected =
                dataSelecionada.getDate() === dia &&
                dataSelecionada.getMonth() === mes &&
                dataSelecionada.getFullYear() === ano;

              return (
                <button
                  key={dia}
                  className={`dia-btn ${isSelected ? 'selected-glow' : ''}`}
                  onClick={() => setDataSelecionada(new Date(ano, mes, dia))}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        <section className="section-agendamento">
          <h2>Modalidade</h2>

          <div className="modalidades-flex">
            {modalidades.map((m) => (
              <button
                key={m.id}
                className={`modalidade-card ${modalidadeSelecionada === m.id ? 'selected-glow-circle' : ''}`}
                onClick={() => setModalidadeSelecionada(m.id)}
                title={m.name}
              >
                <i className="fas fa-volleyball-ball"></i>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section-agendamento">
          <h2>Quadras disponíveis</h2>

          {carregando ? (
            <p>Carregando quadras...</p>
          ) : quadrasDisponiveis.length === 0 ? (
            <p>Nenhuma quadra disponível para essa data/modalidade.</p>
          ) : (
            <div className="quadras-flex">
              {quadrasDisponiveis.map((courtId) => (
                <div
                  key={courtId}
                  className={`quadra-card ${quadraSelecionada === courtId ? 'selected-glow-border' : ''}`}
                  onClick={() => handleSelecionarQuadra(courtId)}
                  title={courtId}
                >
                  <span>{obterNomeQuadra(courtId)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section-agendamento">
          <h2>Horários disponíveis</h2>

          {carregando ? (
            <p>Carregando horários...</p>
          ) : horariosFiltrados.length === 0 ? (
            <p>Nenhum horário disponível para essa quadra.</p>
          ) : (
            <div className="horarios-grid">
              {horariosFiltrados.map((slot, index) => {
                const label = `${slot.timeInterval.startTime} - ${slot.timeInterval.endTime}`;

                return (
                  <button
                    key={`${slot.courtId}-${slot.timeInterval.startTime}-${index}`}
                    className={`hora-pill ${
                      slotSelecionado === slot ? 'selected-solid-green' : ''
                    }`}
                    onClick={() => setSlotSelecionado(slot)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {slotSelecionado && (
          <section className="section-agendamento resumo-agendamento">
            <h2>Resumo</h2>
            <p>Modalidade: {modalidadeAtual?.name || 'Modalidade'}</p>
            <p>Data: {formatarDataISO(dataSelecionada)}</p>
            <p>Quadra: {obterNomeQuadra(slotSelecionado.courtId)}</p>
            <p>
              Horário: {slotSelecionado.timeInterval.startTime} - {slotSelecionado.timeInterval.endTime}
            </p>
            <p>Preço: R$ {slotSelecionado.price}</p>
          </section>
        )}

        <button className="btn-confirmar-agendamento" onClick={handleConfirmar}>
          CONFIRMAR
        </button>
      </main>
    </div>
  );
}

export default AgendarHorario;