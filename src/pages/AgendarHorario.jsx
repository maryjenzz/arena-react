import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/agendar.css';

function AgendarHorario() {
  const navigate = useNavigate();

  // Estados para controlar o que está selecionado
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState("13:00"); // Inicia às 13:00
  const [quadraSelecionada, setQuadraSelecionada] = useState(""); 
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState(""); 

  const [quadras, setQuadras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [diasBloqueados, setDiasBloqueados] = useState([]);

  useEffect(() => {
    // Quadras
    const quadrasSalvas = localStorage.getItem('quadras');
    if (quadrasSalvas) {
      setQuadras(JSON.parse(quadrasSalvas));
    } else {
      const quadrasPadrao = [
        { id: 1, nome: 'Quadra 01', bloqueada: false },
        { id: 2, nome: 'Quadra 02', bloqueada: false },
      ];
      localStorage.setItem('quadras', JSON.stringify(quadrasPadrao));
      setQuadras(quadrasPadrao);
    }

    // Modalidades
    const modSalvas = localStorage.getItem('modalidades');
    if (modSalvas) {
      setModalidades(JSON.parse(modSalvas));
    } else {
      const modPadrao = [
        { id: 1, nome: 'Beach Tennis', icone: 'fas fa-table-tennis', descricao: 'Uma mistura emocionante de tênis, vôlei de praia e frescobol, perfeita para todos os níveis de habilidade.' },
        { id: 2, nome: 'Futevôlei', icone: 'fas fa-futbol', descricao: 'Combine a paixão nacional do futebol com a técnica e a dinâmica do vôlei em nossas quadras de areia.' },
        { id: 3, nome: 'Vôlei de Praia', icone: 'fas fa-volleyball-ball', descricao: 'Junte seus amigos para uma partida do clássico esporte de areia. Diversão e exercício garantidos!' },
      ];
      localStorage.setItem('modalidades', JSON.stringify(modPadrao));
      setModalidades(modPadrao);
    }

    // Dias Bloqueados
    const diasBloqSalvos = localStorage.getItem('diasBloqueados');
    if (diasBloqSalvos) {
      setDiasBloqueados(JSON.parse(diasBloqSalvos));
    }
  }, []);

  const quadrasAtivas = quadras.filter(q => !q.bloqueada);

  useEffect(() => {
    if (quadrasAtivas.length > 0 && !quadrasAtivas.some(q => q.nome === quadraSelecionada)) {
      setQuadraSelecionada(quadrasAtivas[0].nome);
    }
  }, [quadras, quadraSelecionada]);

  useEffect(() => {
    if (modalidades.length > 0 && !modalidades.some(m => m.nome === modalidadeSelecionada)) {
      setModalidadeSelecionada(modalidades[0].nome);
    }
  }, [modalidades, modalidadeSelecionada]);

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

  const formatarChaveProps = (anoVal, mesVal, diaVal) => {
    const m = String(mesVal + 1).padStart(2, '0');
    const d = String(diaVal).padStart(2, '0');
    return `${anoVal}-${m}-${d}`;
  };
  
  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "11:30", "12:00", "12:32", "13:00", "13:30"
  ];

  const formatarHorarioFaixa = (horaInicio) => {
    const [h, m] = horaInicio.split(':');
    const fH = String((Number(h) + 1) % 24).padStart(2, '0');
    return `${horaInicio} - ${fH}:${m}`;
  };

  const handleConfirmar = () => {
    if (!quadraSelecionada) {
      alert('Selecione uma quadra.');
      return;
    }
    if (!modalidadeSelecionada) {
      alert('Selecione uma modalidade.');
      return;
    }

    const dia = String(dataSelecionada.getDate()).padStart(2, '0');
    const mesFormatado = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
    const anoFormatado = dataSelecionada.getFullYear();
    const dataChave = `${anoFormatado}-${mesFormatado}-${dia}`;

    const reservasExistentes = JSON.parse(localStorage.getItem('reservas')) || [];
    const faixa = formatarHorarioFaixa(horarioSelecionado);

    const conflito = reservasExistentes.find(
      (r) => r.data === dataChave && r.quadra === quadraSelecionada && r.horario === faixa
    );

    if (conflito) {
      alert('Este horário já está reservado nesta quadra para o dia selecionado.');
      return;
    }

    const novaReserva = {
      id: Date.now(),
      grupoId: Date.now(),
      data: dataChave,
      usuario: 'Usuário Cliente',
      telefone: '(47)99999-9999',
      quadra: quadraSelecionada,
      horario: faixa,
    };

    localStorage.setItem('reservas', JSON.stringify([...reservasExistentes, novaReserva]));
    alert(`Agendamento confirmado!\nDia: ${dia}/${mesFormatado}/${anoFormatado}\nHora: ${horarioSelecionado}\n${quadraSelecionada}\nModalidade: ${modalidadeSelecionada}`);
    navigate('/historico');
  };

  return (
    <div className="agendar-container">
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
      <main className="agendar-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="agendar-title">Agendar Horário</h1>
        <p className="agendar-subtitle">Selecione a data, horário e quadra para realizar seu agendamento.</p>

        {/* Calendário */}
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
              const chaveDia = formatarChaveProps(ano, mes, dia);
              const isBlocked = diasBloqueados.includes(chaveDia);
              const isSelected =
                dataSelecionada.getDate() === dia &&
                dataSelecionada.getMonth() === mes &&
                dataSelecionada.getFullYear() === ano;

              return (
                <button
                  key={dia}
                  className={`dia-btn ${isSelected ? 'selected-glow' : ''}`}
                  disabled={isBlocked}
                  style={isBlocked ? { opacity: 0.25, cursor: 'not-allowed', color: '#999' } : {}}
                  onClick={() => setDataSelecionada(new Date(ano, mes, dia))}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horários */}
        <section className="section-agendamento">
          <h2>Horários disponíveis</h2>
          <div className="horarios-grid">
            {horarios.map((hora) => (
              <button
                key={hora}
                className={`hora-pill ${horarioSelecionado === hora ? 'selected-solid-green' : ''}`}
                onClick={() => setHorarioSelecionado(hora)}
              >
                {hora}
              </button>
            ))}
          </div>
        </section>

        {/* Quadras */}
        <section className="section-agendamento">
          <h2>Quadras disponíveis</h2>
          <div className="quadras-flex">
            {quadrasAtivas.map((quadra) => (
              <div
                key={quadra.id}
                className={`quadra-card ${quadraSelecionada === quadra.nome ? 'selected-glow-border' : ''}`}
                onClick={() => setQuadraSelecionada(quadra.nome)}
              >
                <span>{quadra.nome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Modalidade */}
        <section className="section-agendamento">
          <h2>Modalidade</h2>
          <div className="modalidades-flex">
            {modalidades.map((m) => (
              <button 
                key={m.id}
                className={`modalidade-circle ${modalidadeSelecionada === m.nome ? 'selected-glow-circle' : ''}`}
                onClick={() => setModalidadeSelecionada(m.nome)}
                title={m.nome}
              >
                <i className={m.icone}></i>
              </button>
            ))}
          </div>
        </section>

        {/* Botão Confirmar */}
        <button className="btn-confirmar-agendamento" onClick={handleConfirmar}>
          CONFIRMAR
        </button>
      </main>
    </div>
  );
}

export default AgendarHorario;