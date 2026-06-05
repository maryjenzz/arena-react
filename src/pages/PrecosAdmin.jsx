import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/precosAdmin.css';

function PrecosAdmin() {
  const navigate = useNavigate();

  const [precos, setPrecos] = useState({
    semana: { manha: '0,00', tarde: '0,00', noite: '80,00', tempo: '60min' },
    sabado: { manha: '0,00', tarde: '0,00', noite: '0,00', tempo: '60min' },
    domingo: { manha: '0,00', tarde: '0,00', noite: '80,00', tempo: '60min' },
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [campoEditando, setCampoEditando] = useState(null);
  const [novoValor, setNovoValor] = useState('');

  function abrirEditorPreco(linha, campo, valor) {
    setCampoEditando({ linha, campo });
    setNovoValor(valor);
    setModalAberto(true);
  }

  function formatarValorMonetario(valor) {
    const valorLimpo = valor.replace('R$', '').trim();

    if (valorLimpo.includes(',')) {
      const partes = valorLimpo.split(',');
      const reais = partes[0].replace(/[^\d]/g, '') || '0';
      const centavos = (partes[1].replace(/[^\d]/g, '') || '00').padEnd(2, '0').slice(0, 2);

      return `${Number(reais).toLocaleString('pt-BR')},${centavos}`;
    }

    const apenasNumeros = valorLimpo.replace(/[^\d]/g, '');

    if (!apenasNumeros) {
      return '0,00';
    }

    return `${Number(apenasNumeros).toLocaleString('pt-BR')},00`;
  }

  function salvarNovoValor() {
    if (!campoEditando) return;

    let valorFinal = novoValor;

    if (campoEditando.campo !== 'tempo') {
      valorFinal = formatarValorMonetario(novoValor);
    }

    setPrecos({
      ...precos,
      [campoEditando.linha]: {
        ...precos[campoEditando.linha],
        [campoEditando.campo]: valorFinal,
      },
    });

    setModalAberto(false);
  }

  function salvarPrecos() {
    localStorage.setItem('precosAdmin', JSON.stringify(precos));
    alert('Preços salvos com sucesso!');
  }

  function CampoPreco({ linha, campo, valor }) {
    return (
      <button
        type="button"
        className="preco-campo"
        onClick={() => abrirEditorPreco(linha, campo, valor)}
      >
        <span>R$</span>
        <span>{valor}</span>
      </button>
    );
  }

  function CampoTempo({ linha, valor }) {
    return (
      <button
        type="button"
        className="tempo-display"
        onClick={() => abrirEditorPreco(linha, 'tempo', valor)}
      >
        {valor}
      </button>
    );
  }

  return (
    <div className="precos-admin-container">
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

      <main className="precos-admin-content">
        <button className="precos-back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1 className="precos-admin-title">Tabela de Preços</h1>

        <div className="precos-tabela">
          <div className="precos-header">
            <span></span>
            <span>Manhã</span>
            <span>Tarde</span>
            <span>Noite</span>
            <span>Tempo</span>
          </div>

          <div className="precos-linha">
            <strong>Segunda à Sexta</strong>
            <CampoPreco linha="semana" campo="manha" valor={precos.semana.manha} />
            <CampoPreco linha="semana" campo="tarde" valor={precos.semana.tarde} />
            <CampoPreco linha="semana" campo="noite" valor={precos.semana.noite} />
            <CampoTempo linha="semana" valor={precos.semana.tempo} />
          </div>

          <div className="precos-linha">
            <strong>Sábados</strong>
            <CampoPreco linha="sabado" campo="manha" valor={precos.sabado.manha} />
            <CampoPreco linha="sabado" campo="tarde" valor={precos.sabado.tarde} />
            <CampoPreco linha="sabado" campo="noite" valor={precos.sabado.noite} />
            <CampoTempo linha="sabado" valor={precos.sabado.tempo} />
          </div>

          <div className="precos-linha">
            <strong>Domingos e Feriados</strong>
            <CampoPreco linha="domingo" campo="manha" valor={precos.domingo.manha} />
            <CampoPreco linha="domingo" campo="tarde" valor={precos.domingo.tarde} />
            <CampoPreco linha="domingo" campo="noite" valor={precos.domingo.noite} />
            <CampoTempo linha="domingo" valor={precos.domingo.tempo} />
          </div>
        </div>

        <button className="btn-salvar-precos" onClick={salvarPrecos}>
          Salvar
        </button>
      </main>

      {modalAberto && (
        <div className="modal-preco-fundo">
          <div className="modal-preco-card">
            <h2>{campoEditando?.campo === 'tempo' ? 'Alterar Tempo' : 'Alterar Valor'}</h2>

            <input
              type="text"
              placeholder={campoEditando?.campo === 'tempo' ? 'Ex: 60min' : 'Ex: 80 ou 80,50'}
              value={novoValor}
              onChange={(e) => setNovoValor(e.target.value)}
              autoFocus
            />

            <div className="modal-preco-botoes">
              <button type="button" onClick={salvarNovoValor}>
                Salvar
              </button>

              <button type="button" onClick={() => setModalAberto(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrecosAdmin;