import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/style.css'; 

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <img src={logo} alt="Logo Arena Máfia" className="logo" />
      
      {/* Navegação original para o desktop - esta vai aparecer em telas grandes */}
      <nav className="navbar">
          <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><a href="#modalidades">Modalidades</a></li>
              <li><a href="#horarios">Horários</a></li>
              <li><a href="#localizacao">Localização</a></li>
              <li><a href="#contato">Contato</a></li>
              <li className="login-item"><Link to="/login" className="btn-login">Login</Link></li>
          </ul>
      </nav>

      {/* Container do dropdown para mobile - aparece apenas em telas pequenas */}
      <div className="mobile-dropdown-container">
        {/* Botão de menu que abre/fecha o dropdown */}
        <button className="btn-menu-mobile" onClick={toggleDropdown}>
          MENU 
          <i className={`fas ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '0.8rem' }}></i>
        </button>
        
        {/* Conteúdo do dropdown, visível quando isDropdownOpen é true */}
        <div className={`mobile-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#modalidades">Modalidades</a></li>
            <li><a href="#horarios">Horários</a></li>
            <li><a href="#localizacao">Localização</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><Link to="/login">Login</Link></li> {/* Removi a classe btn-login aqui */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;