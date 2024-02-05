const API_BASE_URL = 'http://localhost:8000/mbr/api';

const api = {
  async nuevaUnidad(datosUnidad) {
    try {
      const response = await fetch(`${API_BASE_URL}/nueva_unidad/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUnidad),
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al registrar nueva unidad:', error);
      throw error;
    }
  },

  async nuevaArea(datosArea) {
    try {
      const response = await fetch(`${API_BASE_URL}/nueva_area/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosArea),
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al registrar nueva área:', error);
      throw error;
    }
  },

  async obtenerDatos() {
    try {
      const response = await fetch(`${API_BASE_URL}/consultar/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  },
};

export default api;
