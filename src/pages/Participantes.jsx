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
        <h1>Asistentes Registrados</h1>
        <button 
          className="btn-registro"
          onClick={() => navigate('/registro')}
        >
          Registrar
        </button>
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar participante por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn-search">
            Buscar
          </button>
          {searchParams.get('search') && (
            <button 
              type="button" 
              className="btn-clear"
              onClick={handleClearSearch}
            >
              ✖ Limpiar
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="loading">Cargando participantes...</div>
      ) : (
        <>
          {searchParams.get('search') && (
            <p className="search-results">
              Resultados para: <strong>{searchParams.get('search')}</strong> 
              ({participantes.length} encontrado{participantes.length !== 1 ? 's' : ''})
            </p>
          )}
          
          <div className="participantes-grid">
            {participantes.length === 0 ? (
              <p className="no-results">No se encontraron participantes</p>
            ) : (
              participantes.map((participante) => (
                <div 
                  key={participante.id} 
                  className="participante-card"
                  onClick={() => navigate(`/gafete/${participante.id}`)}
                >
                  <img 
                    src={participante.avatar} 
                    alt={`${participante.nombre} ${participante.apellidos}`}
                    className="avatar"
                  />
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
                      >
                        {participante.twitter}
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Participantes;
