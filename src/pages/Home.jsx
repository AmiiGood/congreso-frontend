import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-section">
          <div className="logo-collaboration">
            <div className="logo-wrapper">
              <img
                src="https://enes.unam.mx/uploads/1/1/8/1/118158124/published/utl-acambaro.png?1544046187"
                alt="UTL Logo"
                className="utl-logo"
              />
            </div>

            <div className="collaboration-symbol">×</div>

            <div className="logo-wrapper">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHBrT0f_K8ssxw3mENGN474snYXp6-GRSU5wTF3Vv4Rn6cnZwuVMMv03XTucO0RMySvWZdAH61zeE8FJEfG2y9uz9plm7aRis_K9nCOC7QN3zlpQfU2lU-c8XdbX2wEwM5E470ybErxjA/w680/nuestrastic.png"
                alt="Logo Congreso"
                className="congress-logo"
              />
            </div>
          </div>
        </div>

        <h1 className="congress-title">Congreso de</h1>
        <h2 className="congress-subtitle">Tecnologías de la Información</h2>

        <div className="congress-info">
          <p>Universidad Tecnológica de León</p>
          <p className="year">2025</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/participantes")}
          aria-label="Ir al listado de participantes"
        >
          <span>Explorar Participantes</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10h10M10 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;
