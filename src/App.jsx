import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import WhatsAppButton from './components/WhatsAppButton';
import MenuPrincipal from './pages/MenuPrincipal';
import FAQ from './pages/FAQ';
import EditarPerfil from './pages/EditarPerfil';
import TabelaPrecos from './pages/TabelaPrecos';
import HistoricoAgendamento from './pages/HistoricoAgendamento';
import AgendarHorario from './pages/AgendarHorario';
import MenuGestao from './pages/MenuGestao';
import ModalidadesAdmin from './pages/ModalidadesAdmin';
import EditarModalidadeAdmin from './pages/EditarModalidadeAdmin';
import QuadrasAdmin from './pages/QuadrasAdmin';
import EditarQuadraAdmin from './pages/EditarQuadraAdmin';
import HorariosAdmin from './pages/HorariosAdmin';
import PrecosAdmin from './pages/PrecosAdmin';


function AppContent() {
  const location = useLocation();
  const showWhatsappButton = location.pathname === '/';

  return (
    <>
      <div className="main-app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/dashboard" element={<MenuPrincipal />} />
          <Route path="/gestao" element={<MenuGestao />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/perfil" element={<EditarPerfil />} />
          <Route path="/precos" element={<TabelaPrecos />} />
          <Route path="/historico" element={<HistoricoAgendamento />} />
          <Route path="/agendar" element={<AgendarHorario></AgendarHorario>} />
          <Route path="/admin/modalidades" element={<ModalidadesAdmin />} />
          <Route path="/admin/modalidades/nova" element={<EditarModalidadeAdmin />} />
          <Route path="/admin/modalidades/editar/:id" element={<EditarModalidadeAdmin />} />  
          <Route path="/admin/quadras" element={<QuadrasAdmin />} />
          <Route path="/admin/quadras/nova" element={<EditarQuadraAdmin />} />
          <Route path="/admin/quadras/editar/:id" element={<EditarQuadraAdmin />} />
          <Route path="/admin/horarios" element={<HorariosAdmin />} />
          <Route path="/admin/precos" element={<PrecosAdmin />} />
        </Routes>
      </div>

      {showWhatsappButton && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;