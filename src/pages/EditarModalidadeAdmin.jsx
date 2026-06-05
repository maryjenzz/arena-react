import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/editarModalidadeAdmin.css';

function EditarModalidadeAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const iconesPadrao = [
    'fas fa-table-tennis',
    'fas fa-futbol',
    'fas fa-volleyball-ball',
    'fas fa-basketball-ball',
    'fas fa-running',
    'fas fa-dumbbell',
  ];

  const [nome, setNome] = useState('');
  const [icone, setIcone] = useState('fas fa-table-tennis');
  const [descricao, setDescricao] = useState('');
  const [iconesSalvos, setIconesSalvos] = useState(iconesPadrao);

  useEffect(() => {
    const iconesMemoria = localStorage.getItem('iconesModalidades');

    if (iconesMemoria) {
      setIconesSalvos(JSON.parse(iconesMemoria));
    } else {
      localStorage.setItem('iconesModalidades', JSON.stringify(iconesPadrao));
    }

    if (id) {
      const modalidades = JSON.parse(localStorage.getItem('modalidades')) || [];
      const modalidadeEncontrada = modalidades.find((item) => item.id === Number(id));

      if (modalidadeEncontrada) {
        setNome(modalidadeEncontrada.nome);
        setIcone(modalidadeEncontrada.icone);
        setDescricao(modalidadeEncontrada.descricao || '');
      }
    }
  }, [id]);

  function salvarModalidade() {
    if (!nome.trim()) {
      alert('Digite o nome da modalidade.');
      return;
    }

    const modalidades = JSON.parse(localStorage.getItem('modalidades')) || [];

    if (id) {
      const modalidadesAtualizadas = modalidades.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              nome,
              icone,
              descricao,
            }
          : item
      );

      localStorage.setItem('modalidades', JSON.stringify(modalidadesAtualizadas));
    } else {
      const novaModalidade = {
        id: Date.now(),
        nome,
        icone,
        descricao,
      };

      localStorage.setItem(
        'modalidades',
        JSON.stringify([...modalidades, novaModalidade])
      );
    }

    navigate('/admin/modalidades');
  }

  function excluirModalidade() {
  const confirmar = window.confirm('Deseja realmente excluir esta modalidade?');

  if (!confirmar) return;

  const modalidades = JSON.parse(localStorage.getItem('modalidades')) || [];

  const modalidadesAtualizadas = modalidades.filter(
    (item) => item.id !== Number(id)
  );

  localStorage.setItem(
    'modalidades',
    JSON.stringify(modalidadesAtualizadas)
  );

  navigate('/admin/modalidades');
}

  function salvarNovoIcone() {
    if (!icone.trim()) {
      alert('Digite uma classe de ícone.');
      return;
    }

    if (!iconesSalvos.includes(icone)) {
      const novaLista = [...iconesSalvos, icone];
      setIconesSalvos(novaLista);
      localStorage.setItem('iconesModalidades', JSON.stringify(novaLista));
    }
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

      <main className="editar-modalidade-content">
        <Link to="/admin/modalidades" className="editar-voltar-seta">
          <i className="fas fa-arrow-left"></i>
        </Link>

        <div className="editar-modalidade-area">
          <div className="modalidade-preview">
            <i className={icone}></i>
          </div>

          <form className="editar-modalidade-form">
            <input
              type="text"
              placeholder="Alterar Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <div className="input-icone-area">
              <input
                type="text"
                placeholder="Alterar Ícone"
                className="input-verde"
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
              />

              <button type="button" onClick={salvarNovoIcone}>
                +
              </button>
            </div>

            <div className="caixa-icones">
              {iconesSalvos.map((iconeItem, index) => (
                <button
                  type="button"
                  className={`icone-opcao ${icone === iconeItem ? 'icone-selecionado' : ''}`}
                  key={index}
                  onClick={() => setIcone(iconeItem)}
                >
                  <i className={iconeItem}></i>
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Alterar Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <button
              type="button"
              className="btn-salvar-modalidade"
              onClick={salvarModalidade}
            >
              Salvar
            </button>
            {id && (
            <button
                type="button"
                className="btn-excluir-modalidade"
                onClick={excluirModalidade}
            >
                Excluir Modalidade
            </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditarModalidadeAdmin;