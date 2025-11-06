import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService } from '../services/api';
import './Participantes.css';

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();

  useEffect(() => {
    cargarParticipantes();
  }, [searchParams]);

  const cargarParticipantes = async () => {
    setLoading(true);
    try {
      const query = searchParams.get('search');
      const data = query 
        ? await apiService.searchParticipantes(query)
        : await apiService.getParticipantes();
      
      setParticipantes(data.data || []);
    } catch (error) {
      console.error('Error al cargar participantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="participantes-container">
      <header className="participantes-header">
        <div className="header-title">
          <h1>Participantes</h1>
          <p className="header-subtitle">
            {loading ? 'Cargando...' : `${participantes.length} participante${participantes.length !== 1 ? 's' : ''} registrado${participantes.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button 
          className="btn-registro"
          onClick={() => navigate('/registro')}
          aria-label="Registrar nuevo participante"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Nuevo Registro</span>
        </button>
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Buscar participantes"
            />
            {searchQuery && (
              <button 
                type="button"
                className="clear-input-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          <button type="submit" className="btn-search" aria-label="Buscar">
            Buscar
          </button>
          {searchParams.get('search') && (
            <button 
              type="button" 
              className="btn-clear"
              onClick={handleClearSearch}
              aria-label="Mostrar todos los participantes"
            >
              Ver Todos
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando participantes...</p>
        </div>
      ) : (
        <>
          {searchParams.get('search') && (
            <div className="search-results">
              <p>
                Resultados para <strong>"{searchParams.get('search')}"</strong>
              </p>
              <span className="results-count">{participantes.length} encontrado{participantes.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          {participantes.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>No se encontraron participantes</h3>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="participantes-grid">
              {participantes.map((participante) => (
                <div 
                  key={participante.id} 
                  className="participante-card"
                  onClick={() => navigate(`/gafete/${participante.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') navigate(`/gafete/${participante.id}`);
                  }}
                  aria-label={`Ver gafete de ${participante.nombre} ${participante.apellidos}`}
                >
                  <div className="avatar-wrapper">
                    <img 
                      src={participante.avatar} 
                      alt={`${participante.nombre} ${participante.apellidos}`}
                      className="avatar"
                    />
                  </div>
                  <div className="card-content">
                    <h3>{participante.nombre} {participante.apellidos}</h3>
                    <p className="ocupacion">{participante.ocupacion}</p>
                    {participante.twitter && (
                      <a 
                        href={`https://twitter.com/${participante.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twitter-link"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Perfil de Twitter de ${participante.nombre}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{participante.twitter}</span>
                      </a>
                    )}
                  </div>
                  <div className="card-action">
                    <span>Ver gafete</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Participantes;