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
    return <div className="loading-container">Cargando gafete...</div>;
  }

  if (!participante) {
    return null;
  }

  return (
    <div className="gafete-container">
      <button 
        className="btn-back"
        onClick={() => navigate('/participantes')}
      >
        ← Volver al listado
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
          </div>
          
          <div className="gafete-back">
            <div className="back-header">
              <h3>Información de Contacto</h3>
            </div>

            <div className="back-body">
              <div className="contact-item">
                <span className="icon">📧</span>
                <div>
                  <label>Email</label>
                  <p>{participante.email}</p>
                </div>
              </div>

              {participante.twitter && (
                <div className="contact-item">
                  <span className="icon">🐦</span>
                  <div>
                    <label>Twitter</label>
                    <p>{participante.twitter}</p>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <span className="icon">💼</span>
                <div>
                  <label>Ocupación</label>
                  <p>{participante.ocupacion}</p>
                </div>
              </div>

              <div className="qr-section">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}`}
                  alt="QR Code"
                  className="qr-code"
                />
                <p className="qr-label">Escanea para ver perfil</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn-flip"
          onClick={() => setFlipped(!flipped)}
        >
          {flipped ? '🔄 Ver Frente' : '🔄 Ver Reverso'}
        </button>
      </div>
    </div>
  );
}

export default Gafete;
