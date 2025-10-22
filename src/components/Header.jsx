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
      <nav className="navbar">
          <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#modalidades">Modalidades</a></li>
              <li><a href="#horarios">Horários</a></li>
              <li><a href="#localizacao">Localização</a></li>
              <li><a href="#contato">Contato</a></li>
              <li className="login-item"><Link to="/login" className="btn-login">Login</Link></li>
          </ul>
      </nav>

      {/* Menu para dispositivos móveis */}
      <div className="mobile-dropdown-container">
        <button className="btn-menu-mobile" onClick={toggleDropdown}> 
          <i className={`fas ${isDropdownOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <div className={`mobile-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="#home" onClick={toggleDropdown}>Home</a></li> 
            <li><a href="#modalidades" onClick={toggleDropdown}>Modalidades</a></li>
            <li><a href="#horarios" onClick={toggleDropdown}>Horários</a></li>
            <li><a href="#localizacao" onClick={toggleDropdown}>Localização</a></li>
            <li><a href="#contato" onClick={toggleDropdown}>Contato</a></li>
            <li><Link to="/login" onClick={toggleDropdown}>Login</Link></li> 
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;