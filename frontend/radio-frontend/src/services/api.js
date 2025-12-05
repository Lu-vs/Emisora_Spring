import axios from 'axios';

const API_URL = 'http://localhost:8080/emisoras';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emisoraService = {
  // Obtener todas las emisoras
  async getAll() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching emisoras:', error);
      throw error;
    }
  },

  // Obtener emisora por ID
  async getById(id) {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching emisora ${id}:`, error);
      throw error;
    }
  },

  // Crear nueva emisora
  async create(emisora) {
    try {
      const response = await api.post('/', emisora);
      return response.data;
    } catch (error) {
      console.error('Error creating emisora:', error);
      throw error;
    }
  },

  // Actualizar emisora
  async update(id, emisora) {
    try {
      const response = await api.put(`/${id}`, emisora);
      return response.data;
    } catch (error) {
      console.error(`Error updating emisora ${id}:`, error);
      throw error;
    }
  },

  // Eliminar emisora
  async delete(id) {
    try {
      await api.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting emisora ${id}:`, error);
      throw error;
    }
  },
};
