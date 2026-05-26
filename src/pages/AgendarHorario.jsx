import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/agendar.css';

function AgendarHorario() {
  const navigate = useNavigate();

  // Estados para controlar o que está selecionado
  const [diaSelecionado, setDiaSelecionado] = useState(8); // Inicia no dia 8 igual ao print
  const [horarioSelecionado, setHorarioSelecionado] = useState("13:00"); // Inicia às 13:00
  const [quadraSelecionada, setQuadraSelecionada] = useState("Quadra 02"); // Inicia na Quadra 02
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState("volei"); // Inicia no Vôlei

  // Dados mockados baseados na imagem
  const diasJaneiro = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "11:30", "12:00", "12:32", "13:00", "13:30"
  ];

  const quadras = ["Quadra 01", "Quadra 02"];

  const handleConfirmar = () => {
    alert(`Agendamento confirmado!\nDia: ${diaSelecionado}/01/2026\nHora: ${horarioSelecionado}\n${quadraSelecionada}\nModalidade: ${modalidadeSelecionada}`);
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
          <h3 className="mes-ano">Janeiro 2026</h3>
          <div className="dias-semana-header">
            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
          </div>
          <div className="dias-grid">
            {/* Espaços vazios para alinhar o dia 1 na quinta-feira (conforme o print) */}
            <span></span><span></span><span></span><span></span>
            
            {diasJaneiro.map((dia) => (
              <button
                key={dia}
                className={`dia-btn ${diaSelecionado === dia ? 'selected-glow' : ''}`}
                onClick={() => setDiaSelecionado(dia)}
              >
                {dia}
              </button>
            ))}
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
            {quadras.map((quadra) => (
              <div
                key={quadra}
                className={`quadra-card ${quadraSelecionada === quadra ? 'selected-glow-border' : ''}`}
                onClick={() => setQuadraSelecionada(quadra)}
              >
                <span>{quadra}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Modalidade */}
        <section className="section-agendamento">
          <h2>Modalidade</h2>
          <div className="modalidades-flex">
            {/* Tênis */}
            <button 
              className={`modalidade-circle ${modalidadeSelecionada === 'tenis' ? 'selected-glow-circle' : ''}`}
              onClick={() => setModalidadeSelecionada('tenis')}
            >
              <i className="fa-solid fa-racquet"></i>
            </button>

            {/* Vôlei */}
            <button 
              className={`modalidade-circle ${modalidadeSelecionada === 'volei' ? 'selected-glow-circle' : ''}`}
              onClick={() => setModalidadeSelecionada('volei')}
            >
              <i className="fas fa-volleyball-ball"></i>
            </button>

            {/* Futebol */}
            <button 
              className={`modalidade-circle ${modalidadeSelecionada === 'futebol' ? 'selected-glow-circle' : ''}`}
              onClick={() => setModalidadeSelecionada('futebol')}
            >
              <i className="fas fa-football-ball"></i>
            </button>
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