import React from 'react';
import '../styles/style.css'; // Importa o CSS da home

function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Links Rápidos</h3>
          <a href="#home"><i className="fas fa-chevron-circle-right"></i> Home</a>
          <a href="#modalidades"><i className="fas fa-chevron-circle-right"></i> Modalidades</a>
          <a href="#horarios"><i className="fas fa-chevron-circle-right"></i> Horários</a>
          <a href="#localizacao"><i className="fas fa-chevron-circle-right"></i> Localização</a>
          <a href="#contato"><i className="fas fa-chevron-circle-right"></i> Contato</a>
        </div>
        <div className="box">
          <h3>Endereço</h3>
          <p> <i className="fas fa-map-marked-alt"></i>R. Getúlio Vargas, 1015 - Centro Canoinhas - SC</p>
          <div className="share">
            <a href="https://www.instagram.com/arenamafia_canoinhas/" className="fab fa-instagram" target="_blank"></a>
            <a href="https://wa.me/47999808398" className="fab fa-whatsapp" target="_blank"></a>
            <a href="mailto:INSIRA EMAIL DO MAFIA" className="fas fa-envelope"></a>
          </div>
        </div>
      </div>
      <h1 className="credit">Desenvolvido por X | Todos os direitos reservados.</h1>
    </section>
  );
}

export default Footer;