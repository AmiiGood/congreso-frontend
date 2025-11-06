import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import "./Registro.css";

function Registro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    twitter: "",
    ocupacion: "",
    avatar: "https://i.pinimg.com/236x/41/b6/6e/41b66e1ef1f87c8623417771814b535d.jpg",
    acepta_terminos: false,
  });

  const avatarOptions = [
    "https://i.pinimg.com/originals/9b/42/94/9b4294942ca1c3a269ebd0458a967025.jpg",
    "https://www.infobae.com/resizer/v2/OA5XW2NBCJBZXBAD5PPFE3M4DU.jpeg?auth=2d77b3bb5797d940ccac9c56e422cfd41e272ed3470817c4f2462770ea26ec6b&smart=true&width=1200&height=630&quality=85",
    "https://i.pinimg.com/236x/41/b6/6e/41b66e1ef1f87c8623417771814b535d.jpg",
  ];

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "nombre":
        if (!formData.nombre.trim()) {
          newErrors.nombre = "El nombre es requerido";
        } else {
          delete newErrors.nombre;
        }
        break;
      case "apellidos":
        if (!formData.apellidos.trim()) {
          newErrors.apellidos = "Los apellidos son requeridos";
        } else {
          delete newErrors.apellidos;
        }
        break;
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "El formato del email no es válido";
        } else {
          delete newErrors.email;
        }
        break;
      case "ocupacion":
        if (!formData.ocupacion.trim()) {
          newErrors.ocupacion = "La ocupación es requerida";
        } else {
          delete newErrors.ocupacion;
        }
        break;
      case "acepta_terminos":
        if (!formData.acepta_terminos) {
          newErrors.acepta_terminos =
            "Debes aceptar los términos y condiciones";
        } else {
          delete newErrors.acepta_terminos;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son requeridos";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!formData.ocupacion.trim()) {
      newErrors.ocupacion = "La ocupación es requerida";
    }

    if (!formData.acepta_terminos) {
      newErrors.acepta_terminos = "Debes aceptar los términos y condiciones";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      nombre: true,
      apellidos: true,
      email: true,
      ocupacion: true,
      acepta_terminos: true,
    });

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.registrarParticipante(formData);

      if (result.success) {
        alert("¡Participante registrado exitosamente!");
        navigate("/participantes");
      } else {
        alert(result.error || "Error al registrar participante");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar participante. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-header">
          <h1>Nuevo Registro</h1>
          <p className="subtitle">
            Completa el formulario para unirte al congreso
          </p>
        </div>

        <form onSubmit={handleSubmit} className="registro-form" noValidate>
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={() => handleBlur("nombre")}
                className={touched.nombre && errors.nombre ? "error" : ""}
                placeholder="Ingresa tu nombre"
              />
              {touched.nombre && errors.nombre && (
                <svg
                  className="error-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            {touched.nombre && errors.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">
              Apellidos
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                onBlur={() => handleBlur("apellidos")}
                className={touched.apellidos && errors.apellidos ? "error" : ""}
                placeholder="Ingresa tus apellidos"
              />
              {touched.apellidos && errors.apellidos && (
                <svg
                  className="error-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            {touched.apellidos && errors.apellidos && (
              <span className="error-message">{errors.apellidos}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Correo Electrónico
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m22 6-10 7L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={touched.email && errors.email ? "error" : ""}
                placeholder="tu@email.com"
              />
              {touched.email && errors.email && (
                <svg
                  className="error-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Usuario de Twitter</label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="@usuario"
              />
            </div>
            <small>Opcional</small>
          </div>

          <div className="form-group">
            <label htmlFor="ocupacion">
              Ocupación
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="14"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                id="ocupacion"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
                onBlur={() => handleBlur("ocupacion")}
                className={touched.ocupacion && errors.ocupacion ? "error" : ""}
                placeholder="Ej: Estudiante, Desarrollador, Profesor..."
              />
              {touched.ocupacion && errors.ocupacion && (
                <svg
                  className="error-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            {touched.ocupacion && errors.ocupacion && (
              <span className="error-message">{errors.ocupacion}</span>
            )}
          </div>

          <div className="form-group">
            <label>Selecciona un Avatar</label>

            <div className="avatar-selector">
              {avatarOptions.map((url) => (
                <div
                  key={url}
                  className={`avatar-option ${
                    formData.avatar === url ? "selected" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, avatar: url })}
                >
                  <img src={url} alt="avatar" />
                </div>
              ))}
            </div>

            <small>Puedes elegir una imagen predeterminada</small>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acepta_terminos"
                checked={formData.acepta_terminos}
                onChange={handleChange}
                onBlur={() => handleBlur("acepta_terminos")}
              />
              <span className="checkbox-text">
                Acepto los términos y condiciones del congreso
                <span className="required">*</span>
              </span>
            </label>
            {touched.acepta_terminos && errors.acepta_terminos && (
              <span className="error-message">{errors.acepta_terminos}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/participantes")}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 5.5L7.5 14.5L3.5 10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Registrar Participante</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
