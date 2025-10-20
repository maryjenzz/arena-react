// src/components/Footer.jsx
import React from 'react';
import '../styles/style.css'; // Importa o CSS da home

function Footer() {
  return (
    <section className="footer">
      <div className="share-icons-container">
        <a href="tel:+5547999808398" className="fas fa-phone share-icon" target="_blank"></a>
        <a href="https://www.instagram.com/arenamafia_canoinhas/" className="fab fa-instagram share-icon" target="_blank"></a>
        <a href="mailto:INSIRA EMAIL DO MAFIA" className="fas fa-comment share-icon"></a>
      </div>
      <h1 className="credit">Desenvolvido por X | Todos os direitos reservados.</h1>
    </section>
  );
}

export default Footer;