import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/horariosAdmin.css';

function HorariosAdmin() {
  const navigate = useNavigate();

  const [diaSelecionado, setDiaSelecionado] = useState(8);
  const [diasBloqueados, setDiasBloqueados] = useState([12, 13]);

  const quadrasCadastradas =
    JSON.parse(localStorage.getItem('quadras')) || [
      { id: 1, nome: 'Quadra 01', bloqueada: false },
      { id: 2, nome: 'Quadra 02', bloqueada: false },
    ];

  const horariosDisponiveis = [
    '08:00 - 09:00',
    '08:30 - 09:30',
    '09:00 - 10:00',
    '09:30 - 10:30',
    '10:00 - 11:00',
    '10:30 - 11:30',
    '11:00 - 12:00',
    '11:30 - 12:30',
    '12:00 - 13:00',
    '12:30 - 13:30',
    '13:00 - 14:00',
    '13:30 - 14:30',
    '14:00 - 15:00',
    '14:30 - 15:30',
    '15:00 - 16:00',
    '15:30 - 16:30',
    '16:00 - 17:00',
    '16:30 - 17:30',
    '17:00 - 18:00',
    '17:30 - 18:30',
    '18:00 - 19:00',
    '18:30 - 19:30',
    '19:00 - 20:00',
    '19:30 - 20:30',
    '20:00 - 21:00',
    '20:30 - 21:30',
    '21:00 - 22:00',
    '21:30 - 22:30',
  ];

  const [reservas, setReservas] = useState([
    {
      id: 1,
      usuario: 'João Pedro',
      telefone: '(47)999991111',
      quadra: 'Quadra 01',
      horario: '09:00 - 10:00',
    },
    {
      id: 2,
      usuario: 'Maria Clara',
      telefone: '(47)999992222',
      quadra: 'Quadra 02',
      horario: '14:30 - 15:30',
    },
    {
      id: 3,
      usuario: 'Treino',
      telefone: '(47)999993333',
      quadra: 'Quadra 01',
      horario: '17:00 - 18:00',
    },
    {
      id: 4,
      usuario: 'Caio Alves',
      telefone: '(47)999994444',
      quadra: 'Quadra 02',
      horario: '20:30 - 21:30',
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);

  const [formReserva, setFormReserva] = useState({
    usuario: '',
    telefone: '',
    quadra: '',
    horario: '',
  });

  const diasJaneiro = Array.from({ length: 31 }, (_, i) => i + 1);
  const diaBloqueado = diasBloqueados.includes(diaSelecionado);

  function formatarTelefone(valor) {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);

    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    }

    return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2)}`;
  }

  function bloquearOuDesbloquearDia() {
    if (diaBloqueado) {
      setDiasBloqueados(diasBloqueados.filter((dia) => dia !== diaSelecionado));
    } else {
      setDiasBloqueados([...diasBloqueados, diaSelecionado]);
    }
  }

  function abrirCriacaoReserva() {
    setReservaEditando(null);
    setFormReserva({
      usuario: '',
      telefone: '',
      quadra: '',
      horario: '',
    });
    setModalAberto(true);
  }

  function abrirEdicaoReserva(reserva) {
    setReservaEditando(reserva);
    setFormReserva({
      usuario: reserva.usuario,
      telefone: reserva.telefone,
      quadra: reserva.quadra,
      horario: reserva.horario,
    });
    setModalAberto(true);
  }

  function salvarReserva() {
    if (
      !formReserva.usuario ||
      !formReserva.telefone ||
      !formReserva.quadra ||
      !formReserva.horario
    ) {
      alert('Preencha todos os campos.');
      return;
    }

    if (formReserva.telefone.length !== 13) {
      alert('Digite o telefone no formato (00)000000000.');
      return;
    }

    if (reservaEditando) {
      const reservasAtualizadas = reservas.map((reserva) =>
        reserva.id === reservaEditando.id
          ? {
              ...reserva,
              ...formReserva,
            }
          : reserva
      );

      setReservas(reservasAtualizadas);
    } else {
      const novaReserva = {
        id: Date.now(),
        ...formReserva,
      };

      setReservas([...reservas, novaReserva]);
    }

    setModalAberto(false);
  }

  function cancelarReserva(id) {
    const confirmar = window.confirm('Deseja cancelar esta reserva?');

    if (!confirmar) return;

    setReservas(reservas.filter((reserva) => reserva.id !== id));
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
          <h3 className="mes-ano">Janeiro 2026</h3>

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
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            {diasJaneiro.map((dia) => (
              <button
                key={dia}
                className={`
                  dia-btn-admin
                  ${diaSelecionado === dia ? 'selected-glow-admin' : ''}
                  ${diasBloqueados.includes(dia) ? 'dia-bloqueado-admin' : ''}
                `}
                onClick={() => setDiaSelecionado(dia)}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="acoes-admin-horarios">
          <button
            type="button"
            className="btn-agendar-admin"
            onClick={abrirCriacaoReserva}
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

          <div className="reservas-admin-header">
            <span>Usuário</span>
            <span>Quadra</span>
            <span>Horário</span>
            <span></span>
          </div>

          {reservas.map((reserva) => (
            <div className="reserva-admin-linha" key={reserva.id}>
              <span>{reserva.usuario}</span>
              <span>{reserva.quadra}</span>
              <span>{reserva.horario}</span>

              <div className="reserva-admin-acoes">
                <button
                  type="button"
                  className="btn-cancelar-admin"
                  onClick={() => cancelarReserva(reserva.id)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn-editar-admin"
                  onClick={() => abrirEdicaoReserva(reserva)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </section>

        <button type="button" className="btn-salvar-admin-horarios">
          Salvar
        </button>
      </main>

      {modalAberto && (
        <div className="modal-reserva-fundo">
          <div className="modal-reserva-card">
            <button
              className="fechar-modal-reserva"
              onClick={() => setModalAberto(false)}
            >
              <i className="fas fa-times"></i>
            </button>

            <h2>{reservaEditando ? 'Editar Reserva' : 'Nova Reserva'}</h2>

            <input
              type="text"
              placeholder="Nome do usuário"
              value={formReserva.usuario}
              onChange={(e) =>
                setFormReserva({
                  ...formReserva,
                  usuario: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="(00)000000000"
              value={formReserva.telefone}
              onChange={(e) =>
                setFormReserva({
                  ...formReserva,
                  telefone: formatarTelefone(e.target.value),
                })
              }
            />

            <select
              value={formReserva.quadra}
              onChange={(e) =>
                setFormReserva({
                  ...formReserva,
                  quadra: e.target.value,
                })
              }
            >
              <option value="">Selecione a quadra</option>

              {quadrasCadastradas
                .filter((quadra) => !quadra.bloqueada)
                .map((quadra) => (
                  <option key={quadra.id} value={quadra.nome}>
                    {quadra.nome}
                  </option>
                ))}
            </select>

            <select
              value={formReserva.horario}
              onChange={(e) =>
                setFormReserva({
                  ...formReserva,
                  horario: e.target.value,
                })
              }
            >
              <option value="">Selecione o horário</option>

              {horariosDisponiveis.map((horario) => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </select>

            <button className="btn-salvar-modal-reserva" onClick={salvarReserva}>
              Salvar Reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HorariosAdmin;