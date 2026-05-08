import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import WhatsAppButton from './components/WhatsAppButton';
import MenuPrincipal from './pages/MenuPrincipal';

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