import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/faq.css'; // Vamos criar este arquivo CSS abaixo

function FAQ() {
    const navigate = useNavigate();
    // Estado para controlar qual item está aberto. Inicia com o primeiro aberto (index 0) como na imagem.
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            pergunta: "Onde a arena está localizada?",
            resposta: "R. Getúlio Vargas, 1015 - Centro, Canoinhas - SC, 89460-046"
        },
        {
            pergunta: "A arena possui estacionamento próprio?",
            resposta: "Sim, possuímos estacionamento gratuito para clientes durante o período do agendamento."
        },
        {
            pergunta: "Como faço para reservar uma quadra/campo?",
            resposta: "Você pode reservar diretamente pelo Menu Principal na opção 'Agendar Horário', escolhendo o dia e tipo de quadra de sua preferência."
        }
    ];

    const toggleAccordion = (index) => {
        // Se clicar no que já está aberto, fecha. Se não, abre o clicado.
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            {/* Navbar idêntica à do Menu Principal */}
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

            {/* Conteúdo Principal do FAQ */}
            <main className="faq-content">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left"></i>
                </button>

                <h1 className="faq-title">FAQ</h1>

                <div className="accordion-group">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        >
                            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                                <span>{item.pergunta}</span>
                                <i className={`fas fa-chevron-down arrow-icon ${activeIndex === index ? 'rotate' : ''}`}></i>
                            </button>

                            <div className="accordion-body">
                                <div className="accordion-content">
                                    <p>{item.resposta}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default FAQ;