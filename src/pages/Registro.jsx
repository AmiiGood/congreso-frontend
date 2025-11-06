import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import './Registro.css';

function Registro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    twitter: '',
    ocupacion: '',
    avatar: '',
    acepta_terminos: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.ocupacion.trim()) {
      newErrors.ocupacion = 'La ocupación es requerida';
    }

    if (!formData.acepta_terminos) {
      newErrors.acepta_terminos = 'Debes aceptar los términos y condiciones';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.registrarParticipante(formData);
      
      if (result.success) {
        alert('¡Participante registrado exitosamente!');
        navigate('/participantes');
      } else {
        alert(result.error || 'Error al registrar participante');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar participante. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h1>Registro de Participante</h1>
        <p className="subtitle">Completa el formulario para registrarte al congreso</p>

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos *</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className={errors.apellidos ? 'error' : ''}
            />
            {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Usuario de Twitter</label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="@usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ocupacion">Ocupación *</label>
            <input
              type="text"
              id="ocupacion"
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
              className={errors.ocupacion ? 'error' : ''}
            />
            {errors.ocupacion && <span className="error-message">{errors.ocupacion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="avatar">URL del Avatar</label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://ejemplo.com/avatar.jpg"
            />
            <small>Si no proporcionas una imagen, se generará una automáticamente</small>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acepta_terminos"
                checked={formData.acepta_terminos}
                onChange={handleChange}
              />
              <span>Acepto los términos y condiciones *</span>
            </label>
            {errors.acepta_terminos && <span className="error-message">{errors.acepta_terminos}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/participantes')}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
