import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import '../styles/perfil.css';

function EditarPerfil() {
  const navigate = useNavigate();

  const [modoEdicao, setModoEdicao] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const [usuario, setUsuario] = useState({
    username: '',
    fullName: '',
    phone: '',
    role: '',
    foto: null,
  });

  const [dadosForm, setDadosForm] = useState({
    username: '',
    fullName: '',
    phone: '',
    role: '',
    foto: null,
  });

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const response = await apiFetch('/api/users/me');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.developerMessage || 'Erro ao carregar perfil.');
        }

        const usuarioFormatado = {
          username: data.username || '',
          fullName: data.fullName || data.fullname || '',
          phone: data.phone || '',
          role: data.role || '',
          foto: null,
        };

        setUsuario(usuarioFormatado);
        setDadosForm(usuarioFormatado);
        localStorage.setItem('user', JSON.stringify(usuarioFormatado));
      } catch (error) {
        setErro(error.message || 'Erro ao carregar perfil.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      if (modoEdicao) {
        setDadosForm({ ...dadosForm, foto: imageUrl });
      } else {
        setUsuario({ ...usuario, foto: imageUrl });
        setDadosForm({ ...dadosForm, foto: imageUrl });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosForm({ ...dadosForm, [name]: value });
  };

  const handleEditarClick = () => {
    setDadosForm({ ...usuario });
    setModoEdicao(true);
  };

  const handleCancelarClick = () => {
    setDadosForm({ ...usuario });
    setModoEdicao(false);
    setErro('');
  };

  const handleSalvarClick = async () => {
    setErro('');
    setSalvando(true);

    try {
      const response = await apiFetch('/api/users/me/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          fullName: dadosForm.fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.developerMessage || 'Erro ao atualizar perfil.');
      }

      const usuarioAtualizado = {
        username: data.username || usuario.username,
        fullName: data.fullName || data.fullname || dadosForm.fullName,
        phone: data.phone || usuario.phone,
        role: data.role || usuario.role,
        foto: dadosForm.foto,
      };

      setUsuario(usuarioAtualizado);
      setDadosForm(usuarioAtualizado);
      localStorage.setItem('user', JSON.stringify(usuarioAtualizado));

      setModoEdicao(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      setErro(error.message || 'Erro ao atualizar perfil.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <p style={{ color: 'white', padding: '30px' }}>Carregando perfil...</p>;
  }

  return (
    <div className="perfil-container">
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
            <span>{usuario.fullName || usuario.username}</span>
            <i className="fas fa-chevron-down"></i>
            <div
              className="user-avatar"
              style={{
                backgroundImage: usuario.foto ? `url(${usuario.foto})` : 'none',
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        </div>
      </nav>

      <main className="perfil-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="perfil-title">Editar Perfil</h1>

        {erro && <p style={{ color: 'red', marginBottom: '15px' }}>{erro}</p>}

        <div className="perfil-card-layout">
          <div className="foto-section">
            <div className="foto-box">
              {(modoEdicao ? dadosForm.foto : usuario.foto) ? (
                <img
                  src={modoEdicao ? dadosForm.foto : usuario.foto}
                  alt="Avatar"
                  className="user-uploaded-image"
                />
              ) : (
                <i className="fas fa-camera camera-placeholder-icon"></i>
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

          <div className="dados-section">
            <div className="info-group">
              <label>Nome:</label>
              {modoEdicao ? (
                <input
                  type="text"
                  name="fullName"
                  value={dadosForm.fullName}
                  onChange={handleInputChange}
                  className="perfil-input"
                />
              ) : (
                <p>{usuario.fullName}</p>
              )}
            </div>

            <div className="info-group">
              <label>Usuário:</label>
              <p>{usuario.username}</p>
            </div>

            <div className="info-group">
              <label>Telefone:</label>
              <p>{usuario.phone}</p>
            </div>

            <div className="info-group">
              <label>Perfil:</label>
              <p>{usuario.role}</p>
            </div>
          </div>
        </div>

        <div className="perfil-actions">
          <label htmlFor="file-upload" className="btn-outline-dashed">
            <i className="fas fa-upload"></i> Inserir nova foto
          </label>

          {!modoEdicao ? (
            <button className="btn-outline-dashed" onClick={handleEditarClick}>
              <i className="fas fa-edit"></i> Editar
            </button>
          ) : (
            <button
              className="btn-outline-dashed btn-cancelar"
              onClick={handleCancelarClick}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          )}

          <button
            className="btn-save"
            onClick={handleSalvarClick}
            disabled={!modoEdicao || salvando}
            style={{
              opacity: modoEdicao ? 1 : 0.6,
              cursor: modoEdicao ? 'pointer' : 'not-allowed',
            }}
          >
            <i className="fas fa-check"></i> {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditarPerfil;