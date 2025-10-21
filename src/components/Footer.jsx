// src/components/Footer.jsx (TRECHO CORRIGIDO)
import React from 'react';
import '../styles/style.css'; 

function Footer() {
  return (
    <section className="footer">
      <div className="share-icons-container">
        
        {/* WHATSAPP: icones de marca geralmente são padronizados */}
        <a href="https://wa.me/5547999808398" target="_blank">
            <ion-icon name="logo-whatsapp" class="share-icon"></ion-icon>
        </a>
        
        {/* INSTAGRAM */}
        <a href="https://www.instagram.com/arenamafia_canoinhas/" target="_blank">
            <ion-icon name="logo-instagram" class="share-icon"></ion-icon>
        </a>
        
        {/* EMAIL: Usa icon-email com o sufixo -outline para o traçado fino */}
        <a href="mailto:INSIRA EMAIL DO MAFIA">
            <ion-icon name="mail-outline" class="share-icon"></ion-icon>
        </a>
        
      </div>
      <h1 className="credit">Desenvolvido por X | Todos os direitos reservados.</h1>
    </section>
  );
}

export default Footer;