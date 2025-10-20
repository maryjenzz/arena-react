import React from 'react';
import Header from '../components/Header';
import logo from '../assets/imagens/logo-arena-mafia.png';
import Footer from '../components/Footer';
import '../styles/style.css'; 
import CardModalidades from '../components/ModalidadeCard';

function HomePage() {
    return (
        <>
            <Header />
            <div className="page-content"> 
                <section id="home">
                    <img src={logo} alt="Logo Arena Máfia" className="home-logo" />
                    <h1 className="heading"><span>Arena Máfia</span></h1>
                    <p>Primeira Arena de Canoinhas</p>
                    <a href="https://wa.me/47999808398?text=Ol%C3%A1%21+Gostaria+de+fazer+uma+reserva." className="btn-principal" target="_blank">Faça sua Reserva</a>
                </section>
                <section id="modalidades">
                    <h2 className="heading">Nossas <span>Modalidades</span></h2>
                    <div className="modalidades-container">
                        <CardModalidades
                            iconClass="fas fa-table-tennis"
                            title="Beach Tennis"
                            description="Uma mistura emocionante de tênis, vôlei de praia e frescobol, perfeita para todos os níveis de habilidade."
                        />
                        <CardModalidades
                            iconClass="fas fa-futbol"
                            title="Futevôlei"
                            description="Combine a paixão nacional do futebol com a técnica e a dinâmica do vôlei em nossas quadras de areia."
                        />
                        <CardModalidades
                            iconClass="fas fa-volleyball-ball"
                            title="Vôlei de Praia"
                            description="Junte seus amigos para uma partida do clássico esporte de areia. Diversão e exercício garantidos!"
                        />
                    </div>
                </section>

                <section id="horarios">
                    <h2 className="heading">Nossos <span>Horários</span></h2>
                    <div className="tabela-horarios">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dia da Semana</th>
                                    <th>Horário de Funcionamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Segunda a Sexta</td>
                                    <td>08:00 - 23:00</td>
                                </tr>
                                <tr>
                                    <td>Sábados</td>
                                    <td>09:00 - 22:00</td>
                                </tr>
                                <tr>
                                    <td>Domingos e Feriados</td>
                                    <td>09:00 - 20:00</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="aviso-horarios">Horários sujeitos a alterações. Consulte para agendamentos especiais.</p>
                    </div>
                </section>

                <section id="localizacao">
                    <h2 className="heading">Nossa <span>Localização</span></h2>
                    <p className="sub-heading">R. Getúlio Vargas, 1015 - Centro, Canoinhas - SC</p>
                    <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.456884970427!2d-50.38965802381282!3d-26.17833007709214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e1d332679a9f93%3A0x8dd5e9a039755716!2sR.%20Get%C3%BAlio%20Vargas%2C%201015%20-%20Centro%2C%20Canoinhas%20-%20SC%2C%2089460-086!5e0!3m2!1spt-BR!2sbr!4v1686939460243!5m2!1spt-BR!2sbr" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </section>

                <section id="contato">
                    <h2 className="heading">Entre em <span>Contato</span></h2>
                    <div className="contato-container">
                        <form action="#">
                            <input type="text" placeholder="Seu nome" className="contato-box" />
                            <input type="email" placeholder="Seu e-mail" className="contato-box" />
                            <textarea cols="30" rows="10" className="contato-box" placeholder="Sua mensagem"></textarea>
                            <input type="submit" value="Enviar" className="btn-principal" />
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;