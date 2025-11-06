import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import './Gafete.css';

function Gafete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participante, setParticipante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    cargarParticipante();
  }, [id]);

  const cargarParticipante = async () => {
    setLoading(true);
    try {
      const result = await apiService.getParticipante(id);
      if (result.success) {
        setParticipante(result.data);
      } else {
        alert('Participante no encontrado');
        navigate('/participantes');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar el participante');
      navigate('/participantes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando gafete...</p>
      </div>
    );
  }

  if (!participante) {
    return null;
  }

  return (
    <div className="gafete-container">
      <button 
        className="btn-back"
        onClick={() => navigate('/participantes')}
        aria-label="Volver al listado de participantes"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10l5 5M5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Volver al listado</span>
      </button>

      <div className="gafete-wrapper">
        <div className={`gafete ${flipped ? 'flipped' : ''}`}>
          <div className="gafete-front">
            <div className="gafete-header">
              <img 
                src="https://enes.unam.mx/uploads/1/1/8/1/118158124/published/utl-acambaro.png?1544046187" 
                alt="UTL Logo" 
                className="gafete-logo"
              />
              <div className="gafete-title">
                <h2>Congreso TIC's 2025</h2>
                <p>Universidad Tecnológica de León</p>
              </div>
            </div>

            <div className="gafete-body">
              <div className="avatar-container">
                <img 
                  src={participante.avatar} 
                  alt={`${participante.nombre} ${participante.apellidos}`}
                  className="gafete-avatar"
                />
              </div>

              <h1 className="participante-nombre">
                {participante.nombre}
              </h1>
              <h2 className="participante-apellidos">
                {participante.apellidos}
              </h2>

              <div className="participante-info">
                <p className="ocupacion">{participante.ocupacion}</p>
              </div>
            </div>

            <div className="gafete-footer">
              <div className="flip-hint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Toca el botón para ver información de contacto</span>
              </div>
            </div>
          </div>
          
          <div className="gafete-back">
            <div className="back-header">
              <h3>Información de Contacto</h3>
            </div>

            <div className="back-body">
              <div className="contact-item">
                <div className="icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <label>Correo Electrónico</label>
                  <p>{participante.email}</p>
                </div>
              </div>

              {participante.twitter && (
                <div className="contact-item">
                  <div className="icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <label>Twitter</label>
                    <p>{participante.twitter}</p>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <label>Ocupación</label>
                  <p>{participante.ocupacion}</p>
                </div>
              </div>

              <div className="qr-section">
                <div className="qr-wrapper">
                  <svg className="qr-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="3" height="3" fill="currentColor"/>
                    <rect x="18" y="14" width="3" height="3" fill="currentColor"/>
                    <rect x="14" y="18" width="3" height="3" fill="currentColor"/>
                    <rect x="18" y="18" width="3" height="3" fill="currentColor"/>
                  </svg>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}`}
                    alt="QR Code"
                    className="qr-code"
                  />
                </div>
                <p className="qr-label">Escanea para ver perfil completo</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn-flip"
          onClick={() => setFlipped(!flipped)}
          aria-label={flipped ? 'Ver frente del gafete' : 'Ver reverso del gafete'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{flipped ? 'Ver Frente' : 'Ver Reverso'}</span>
        </button>
      </div>
    </div>
  );
}

export default Gafete;