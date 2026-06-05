import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/editarQuadraAdmin.css';

function EditarQuadraAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [bloqueada, setBloqueada] = useState(false);

  useEffect(() => {
    const quadras = JSON.parse(localStorage.getItem('quadras')) || [];
    const quadraEncontrada = quadras.find((item) => item.id === Number(id));

    if (quadraEncontrada) {
      setNome(quadraEncontrada.nome);
      setBloqueada(quadraEncontrada.bloqueada || false);
    }
  }, [id]);

  function salvarQuadra() {
    if (!nome.trim()) {
      alert('Digite o nome da quadra.');
      return;
    }

    const quadras = JSON.parse(localStorage.getItem('quadras')) || [];

    if (id) {
      const quadrasAtualizadas = quadras.map((item) =>
        item.id === Number(id)
          ? { ...item, nome, bloqueada }
          : item
      );

      localStorage.setItem('quadras', JSON.stringify(quadrasAtualizadas));
    } else {
      const novaQuadra = {
        id: Date.now(),
        nome,
        bloqueada,
      };

      localStorage.setItem('quadras', JSON.stringify([...quadras, novaQuadra]));
    }

    navigate('/admin/quadras');
  }

  function excluirQuadra() {
    const confirmar = window.confirm('Deseja realmente excluir esta quadra?');

    if (!confirmar) return;

    const quadras = JSON.parse(localStorage.getItem('quadras')) || [];
    const quadrasAtualizadas = quadras.filter((item) => item.id !== Number(id));

    localStorage.setItem('quadras', JSON.stringify(quadrasAtualizadas));

    navigate('/admin/quadras');
  }

  return (
    <div className="dashboard-container">
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
            <span>Arena Máfia</span>
            <i className="fas fa-chevron-down"></i>
            <div className="user-avatar"></div>
          </div>
        </div>
      </nav>

      <main className="editar-quadra-content">
        <Link to="/admin/quadras" className="editar-quadra-voltar">
          <i className="fas fa-arrow-left"></i>
        </Link>

        <div className="editar-quadra-area">
          <div className={`quadra-preview ${bloqueada ? 'quadra-bloqueada' : ''}`}>
            {nome || 'Quadra'}
          </div>

          <form className="editar-quadra-form">
            <input
              type="text"
              placeholder="Alterar Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <button
              type="button"
              className={`btn-bloquear-quadra ${bloqueada ? 'ativo' : ''}`}
              onClick={() => setBloqueada(!bloqueada)}
            >
              {bloqueada ? 'Desbloquear' : 'Bloquear'}
            </button>

            <button
              type="button"
              className="btn-salvar-quadra"
              onClick={salvarQuadra}
            >
              Salvar
            </button>

            {id && (
              <button
                type="button"
                className="btn-excluir-quadra"
                onClick={excluirQuadra}
              >
                Excluir Quadra
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditarQuadraAdmin;