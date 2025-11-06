const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiService = {
  // Obtener todos los participantes
  async getParticipantes() {
    const response = await fetch(`${API_URL}/api/listado`);
    const data = await response.json();
    return data;
  },

  // Buscar participantes
  async searchParticipantes(query) {
    const response = await fetch(`${API_URL}/api/listado?q=${query}`);
    const data = await response.json();
    return data;
  },

  // Obtener un participante por ID
  async getParticipante(id) {
    const response = await fetch(`${API_URL}/api/participante/${id}`);
    const data = await response.json();
    return data;
  },

  // Registrar nuevo participante
  async registrarParticipante(participante) {
    const response = await fetch(`${API_URL}/api/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participante),
    });
    const data = await response.json();
    return data;
  },
};
