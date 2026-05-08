import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoLobo from '../assets/imagens/logo-arena-mafia.png';
import '../styles/login.css'; 

function LoginPage() {
    const [passwordType, setPasswordType] = useState('password');

    return (
        <div className="login-page-container">
            <div className="bg-logo-overlay">
                <img src={logoLobo} alt="" />
            </div>

            <div className="login-content">
                <h1 className="login-title">Faça seu login <span>.</span></h1>

                <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper focus-green">
                        <input type="email" placeholder="email@exemplo.com" className="input-field" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <div className="input-wrapper">
                        <input type="password" placeholder="••••••••" className="input-field" />
                    </div>
                    <div className="form-footer-links">
                        <a href="#" className="forgot-password">Esqueci minha senha</a>
                    </div>
                </div>

                <button className="btn-entrar">Entrar</button>

                <div className="create-account-area">
                    <Link to="/cadastro" className="create-link">Ainda não tenho uma conta</Link>
                </div>
                
                <Link to="/" className="back-arrow">
                    <i className="fas fa-arrow-left"></i>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;