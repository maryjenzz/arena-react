import React from 'react';
import '../styles/style.css'; 

function Footer() {
  return (
    <section className="footer">
      <div className="share-icons-container">
        
        <a href="https://wa.me/5547999808398" target="_blank">
          <i className="fa-brands fa-whatsapp footer-icon"></i>
        </a>

        <a href="https://www.instagram.com/arenamafia_canoinhas/" target="_blank">
          <i className="fa-brands fa-instagram footer-icon"></i>
        </a>

        <a href="mailto:arenamafiacanoinhas@gmail.com">
          <i className="fa-regular fa-at footer-icon"></i>
        </a>
        
      </div>
      <h1 className="credit">Desenvolvido por X | Todos os direitos reservados.</h1>
    </section>
  );
}

export default Footer;