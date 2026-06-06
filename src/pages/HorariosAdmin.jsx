import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const hojeChave = formatarDataChave(hoje);

  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [currentDate, setCurrentDate] = useState(hoje);

  const formatarChaveProps = (anoVal, mesVal, diaVal) => {
    const m = String(mesVal + 1).padStart(2, '0');
    const d = String(diaVal).padStart(2, '0');
    return `${anoVal}-${m}-${d}`;
  };

  const [diasBloqueados, setDiasBloqueados] = useState(() => {
    const salvas = localStorage.getItem('diasBloqueados');
    return salvas ? JSON.parse(salvas) : [
      formatarChaveProps(hoje.getFullYear(), hoje.getMonth(), 12),
      formatarChaveProps(hoje.getFullYear(), hoje.getMonth(), 13),
    ];
  });

  useEffect(() => {
    localStorage.setItem('diasBloqueados', JSON.stringify(diasBloqueados));
  }, [diasBloqueados]);

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

  const [reservas, setReservas] = useState(() => {
    const salvas = localStorage.getItem('reservas');
    if (salvas) {
      return JSON.parse(salvas);
    }
    const inicial = [
      {
        id: 1,
        grupoId: 1,
        usuario: 'João Pedro',
        telefone: '(47)999991111',
        quadra: 'Quadra 01',
        horario: '09:00 - 10:00',
        data: hojeChave,
      },
      {
        id: 2,
        grupoId: 2,
        usuario: 'Maria Clara',
        telefone: '(47)999992222',
        quadra: 'Quadra 02',
        horario: '14:30 - 15:30',
        data: hojeChave,
      },
      {
        id: 3,
        grupoId: 3,
        usuario: 'Treino',
        telefone: '(47)999993333',
        quadra: 'Quadra 01',
        horario: '17:00 - 18:00',
        data: hojeChave,
      },
      {
        id: 4,
        grupoId: 4,
        usuario: 'Caio Alves',
        telefone: '(47)999994444',
        quadra: 'Quadra 02',
        horario: '20:30 - 21:30',
        data: hojeChave,
      },
    ];
    localStorage.setItem('reservas', JSON.stringify(inicial));
    return inicial;
  });

  useEffect(() => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }, [reservas]);

  const [modalAberto, setModalAberto] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [reservaParaCancelar, setReservaParaCancelar] = useState(null);

  const [formReserva, setFormReserva] = useState({
    usuario: '',
    telefone: '',
    quadra: '',
    horario: '',
    repetir: 'nao',
    diasSemana: [],
  });

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

  const prevMonth = () => {
    setCurrentDate(new Date(ano, mes - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(ano, mes + 1, 1));
  };

  const dataSelecionadaChave = formatarDataChave(dataSelecionada);
  const diaBloqueado = diasBloqueados.includes(dataSelecionadaChave);

  function formatarTelefone(valor) {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);

    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    }

    return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2)}`;
  }

  function bloquearOuDesbloquearDia() {
    if (diaBloqueado) {
      setDiasBloqueados(diasBloqueados.filter((chave) => chave !== dataSelecionadaChave));
    } else {
      setDiasBloqueados([...diasBloqueados, dataSelecionadaChave]);
    }
  }

  const gerarDatasRepetidas = (dataInicioStr, repetirOpcao, diasSemanaSelecionados) => {
    const datas = [];
    const [anoStr, mesStr, diaStr] = dataInicioStr.split('-');
    const dataInicio = new Date(Number(anoStr), Number(mesStr) - 1, Number(diaStr));

    if (repetirOpcao === 'semanal') {
      for (let i = 1; i <= 8; i++) {
        const novaData = new Date(dataInicio);
        novaData.setDate(dataInicio.getDate() + i * 7);
        datas.push(formatarDataChave(novaData));
      }
    } else if (repetirOpcao === 'mensal') {
      for (let i = 1; i <= 6; i++) {
        const novaData = new Date(dataInicio);
        novaData.setMonth(dataInicio.getMonth() + i);
        datas.push(formatarDataChave(novaData));
      }
    } else if (repetirOpcao === 'personalizado') {
      for (let i = 1; i <= 28; i++) {
        const novaData = new Date(dataInicio);
        novaData.setDate(dataInicio.getDate() + i);
        if (diasSemanaSelecionados.includes(novaData.getDay())) {
          datas.push(formatarDataChave(novaData));
        }
      }
    }
    return datas;
  };

  function abrirCriacaoReserva() {
    setReservaEditando(null);
    setFormReserva({
      usuario: '',
      telefone: '',
      quadra: '',
      horario: '',
      repetir: 'nao',
      diasSemana: [],
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
      repetir: reserva.repetir || 'nao',
      diasSemana: reserva.diasSemana || [],
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
      const baseId = Date.now();
      const novaReserva = {
        id: baseId,
        grupoId: baseId,
        data: dataSelecionadaChave,
        usuario: formReserva.usuario,
        telefone: formReserva.telefone,
        quadra: formReserva.quadra,
        horario: formReserva.horario,
        repetir: formReserva.repetir,
        diasSemana: formReserva.diasSemana,
      };

      let novasReservas = [novaReserva];

      if (formReserva.repetir !== 'nao') {
        const datasRepetidas = gerarDatasRepetidas(
          dataSelecionadaChave,
          formReserva.repetir,
          formReserva.diasSemana
        );
        datasRepetidas.forEach((dataRep, idx) => {
          novasReservas.push({
            id: baseId + idx + 1,
            grupoId: baseId,
            data: dataRep,
            usuario: formReserva.usuario,
            telefone: formReserva.telefone,
            quadra: formReserva.quadra,
            horario: formReserva.horario,
            repetir: formReserva.repetir,
            diasSemana: formReserva.diasSemana,
          });
        });
      }

      setReservas([...reservas, ...novasReservas]);
    }

    setModalAberto(false);
  }

  function cancelarReserva(reserva) {
    const countGrupo = reservas.filter(
      (r) => r.grupoId && r.grupoId === reserva.grupoId
    ).length;

    if (reserva.grupoId && countGrupo > 1) {
      setReservaParaCancelar(reserva);
      setModalCancelarAberto(true);
    } else {
      const confirmar = window.confirm('Deseja cancelar esta reserva?');
      if (confirmar) {
        setReservas(reservas.filter((r) => r.id !== reserva.id));
      }
    }
  }

  function executarCancelamento(opcao) {
    if (!reservaParaCancelar) return;

    if (opcao === 'apenas-esta') {
      setReservas(reservas.filter((r) => r.id !== reservaParaCancelar.id));
    } else if (opcao === 'todas-futuras') {
      setReservas(
        reservas.filter((r) => {
          if (r.grupoId === reservaParaCancelar.grupoId) {
            return r.data < reservaParaCancelar.data;
          }
          return true;
        })
      );
    }

    setModalCancelarAberto(false);
    setReservaParaCancelar(null);
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

          {reservas.filter((reserva) => reserva.data === dataSelecionadaChave).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontWeight: 'bold' }}>
              Nenhuma reserva para este dia.
            </div>
          ) : (
            reservas
              .filter((reserva) => reserva.data === dataSelecionadaChave)
              .map((reserva) => (
                <div className="reserva-admin-linha" key={reserva.id}>
                  <span>{reserva.usuario}</span>
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

                    <button
                      type="button"
                      className="btn-editar-admin"
                      onClick={() => abrirEdicaoReserva(reserva)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
          )}
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

            <select
              value={formReserva.repetir}
              onChange={(e) =>
                setFormReserva({
                  ...formReserva,
                  repetir: e.target.value,
                  diasSemana: []
                })
              }
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '10px',
                border: '1px solid #d9d9d9',
                backgroundColor: '#0b0b0b',
                color: 'white',
                padding: '0 15px',
                marginBottom: '15px',
                fontWeight: 'bold',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="nao">Não repetir</option>
              <option value="semanal">Repetir semanalmente (8 semanas)</option>
              <option value="mensal">Repetir mensalmente (6 meses)</option>
              <option value="personalizado">Repetir personalizado (dias específicos)</option>
            </select>

            {formReserva.repetir === 'personalizado' && (
              <div style={{ marginBottom: '15px', padding: '0 5px' }}>
                <p style={{ color: 'white', fontSize: '0.85rem', marginBottom: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                  Escolha os dias da semana:
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((diaNome, idx) => {
                    const isSelected = formReserva.diasSemana.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const novosDias = isSelected
                            ? formReserva.diasSemana.filter((d) => d !== idx)
                            : [...formReserva.diasSemana, idx];
                          setFormReserva({ ...formReserva, diasSemana: novosDias });
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '6px',
                          border: '1px solid #d9d9d9',
                          backgroundColor: isSelected ? 'green' : 'transparent',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {diaNome}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button className="btn-salvar-modal-reserva" onClick={salvarReserva}>
              Salvar Reserva
            </button>
          </div>
        </div>
      )}

      {modalCancelarAberto && (
        <div className="modal-reserva-fundo">
          <div className="modal-reserva-card" style={{ border: '2px solid red', boxShadow: '0 0 35px rgba(255, 0, 0, 0.7)' }}>
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
            <p style={{ color: 'white', marginBottom: '25px', fontSize: '0.95rem', lineHeight: '1.4' }}>
              Esta reserva faz parte de uma série recorrente. Como você deseja proceder?
            </p>

            <button 
              className="btn-salvar-modal-reserva" 
              onClick={() => executarCancelamento('apenas-esta')}
              style={{ marginBottom: '12px', backgroundColor: '#333', border: '1px solid #555' }}
            >
              Cancelar apenas esta ocorrência
            </button>

            <button 
              className="btn-salvar-modal-reserva" 
              onClick={() => executarCancelamento('todas-futuras')}
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