import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-section">
          <img 
            src="https://enes.unam.mx/uploads/1/1/8/1/118158124/published/utl-acambaro.png?1544046187" 
            alt="UTL Logo" 
            className="utl-logo"
          />
        </div>
        
        <h1 className="congress-title">Congreso de</h1>
        <h2 className="congress-subtitle">Tecnologías de la Información</h2>
        
        <div className="congress-info">
          <p>Universidad Tecnológica de León</p>
          <p className="year">2025</p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => navigate('/participantes')}
          aria-label="Ir al listado de participantes"
        >
          <span>Explorar Participantes</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;