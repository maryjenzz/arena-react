import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/perfil.css'; 

function EditarPerfil() {
  const navigate = useNavigate();

  // Controla se o usuário está visualizando ou editando os campos
  const [modoEdicao, setModoEdicao] = useState(false);

  // Dados do usuário
  const [usuario, setUsuario] = useState({
    nome: "Usuário",
    email: "usuario@gmail.com",
    telefone: "(12) 12345689",
    endereco: "Rua 123 - nº 456 Bairro Feliz Canoinhas Santa Catarina",
    foto: null 
  });

  // Estado temporário para segurar os dados enquanto o usuário digita
  const [dadosForm, setDadosForm] = useState({ ...usuario });

  // Atualiza a foto de perfil
  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Se estiver em modo edição, atualiza o form. Se não, atualiza direto.
      if (modoEdicao) {
        setDadosForm({ ...dadosForm, foto: imageUrl });
      } else {
        setUsuario({ ...usuario, foto: imageUrl });
        setDadosForm({ ...dadosForm, foto: imageUrl });
      }
    }
  };

  // Atualiza os estados dos inputs em tempo real
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosForm({ ...dadosForm, [name]: value });
  };

  // Ativa o modo de edição clonando os dados reais atuais
  const handleEditarClick = () => {
    setDadosForm({ ...usuario });
    setModoEdicao(true);
  };

  // Salva as alterações feitas no formulário
  const handleSalvarClick = () => {
    setUsuario({ ...dadosForm });
    setModoEdicao(false);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="perfil-container">
      {/* Navbar */}
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
            <span>{usuario.nome}</span>
            <i className="fas fa-chevron-down"></i>
            <div className="user-avatar" style={{ backgroundImage: `url(${usuario.foto})`, backgroundSize: 'cover' }}></div>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="perfil-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="perfil-title">Editar Perfil</h1>

        <div className="perfil-card-layout">
          {/* Lado Esquerdo: Área da Foto */}
          <div className="foto-section">
            <div className="foto-box">
              {modoEdicao ? (
                dadosForm.foto ? (
                  <img src={dadosForm.foto} alt="Avatar" className="user-uploaded-image" />
                ) : (
                  <i className="fas fa-camera camera-placeholder-icon"></i>
                )
              ) : (
                usuario.foto ? (
                  <img src={usuario.foto} alt="Avatar" className="user-uploaded-image" />
                ) : (
                  <i className="fas fa-camera camera-placeholder-icon"></i>
                )
              )}
            </div>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFotoUpload} 
              style={{ display: 'none' }} 
            />
          </div>

          {/* Lado Direito: Dados do Usuário */}
          <div className="dados-section">
            <div className="info-group">
              <label>Nome:</label>
              {modoEdicao ? (
                <input 
                  type="text" 
                  name="nome" 
                  value={dadosForm.nome} 
                  onChange={handleInputChange} 
                  className="perfil-input"
                />
              ) : (
                <p>{usuario.nome}</p>
              )}
            </div>

            <div className="info-group">
              <label>Email:</label>
              {modoEdicao ? (
                <input 
                  type="email" 
                  name="email" 
                  value={dadosForm.email} 
                  onChange={handleInputChange} 
                  className="perfil-input"
                />
              ) : (
                <p>{usuario.email}</p>
              )}
            </div>

            <div className="info-group">
              <label>Telefone:</label>
              {modoEdicao ? (
                <input 
                  type="text" 
                  name="telefone" 
                  value={dadosForm.telefone} 
                  onChange={handleInputChange} 
                  className="perfil-input"
                />
              ) : (
                <p>{usuario.telefone}</p>
              )}
            </div>

            <div className="info-group">
              <label>Endereço:</label>
              {modoEdicao ? (
                <textarea 
                  name="endereco" 
                  value={dadosForm.endereco} 
                  onChange={handleInputChange} 
                  className="perfil-textarea"
                  rows="4"
                />
              ) : (
                <p className="endereco-text">{usuario.endereco}</p>
              )}
            </div>
          </div>
        </div>

        {/* SESSÃO DE BOTÕES LADO A LADO */}
        <div className="perfil-actions">
          <label htmlFor="file-upload" className="btn-outline-dashed">
            <i className="fas fa-upload"></i> Inserir nova foto
          </label>

          {!modoEdicao ? (
            <button className="btn-outline-dashed" onClick={handleEditarClick}>
              <i className="fas fa-edit"></i> Editar
            </button>
          ) : (
            <button className="btn-outline-dashed btn-cancelar" onClick={() => setModoEdicao(false)}>
              <i className="fas fa-times"></i> Cancelar
            </button>
          )}

          <button 
            className="btn-save" 
            onClick={handleSalvarClick}
            disabled={!modoEdicao} // Opcional: desabilita o botão salvar se não houver edição ativa
            style={{ opacity: modoEdicao ? 1 : 0.6, cursor: modoEdicao ? 'pointer' : 'not-allowed' }}
          >
            <i className="fas fa-check"></i> Salvar
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditarPerfil;