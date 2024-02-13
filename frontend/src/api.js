const API_BASE_URL = 'http://127.0.0.1:8000/mbr';

const api = {
  async obtenerUnidades() {
    try {
      const response = await fetch(`${API_BASE_URL}/unidades/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
      throw error;
    }
  },

  async obtenerAreas() {
    try {
      const response = await fetch(`${API_BASE_URL}/areas/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
      throw error;
    }
  },

  async obtenerSubAreas() {
    try {
      const response = await fetch(`${API_BASE_URL}/subareas/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener las subáreas:', error);
      throw error;
    }
  },

  async nuevaUnidad(datosUnidad) {
    try {
      const response = await fetch(`${API_BASE_URL}/unidades/`, {
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
      const response = await fetch(`${API_BASE_URL}/areas/`, {
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

  async nuevaSubArea(datosSubArea) {
    try {
      const response = await fetch(`${API_BASE_URL}/subareas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSubArea),
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al registrar nueva subárea:', error);
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

  async editarArea(id, datosArea) {
    try {
      const response = await fetch(`${API_BASE_URL}/areas/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(datosArea), 
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al editar área:', error);
      throw error;
    }
  },

  async eliminarArea(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/areas/${id}/`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status === 204) {
        return { success: true };
      } else {
        throw new Error('No se pudo eliminar el área');
      }
    } catch (error) {
      console.error('Error al eliminar área:', error);
      throw error;
    }
  },

  async editarSubArea(id, datosSubArea) {
    try {
      const response = await fetch(`${API_BASE_URL}/subareas/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(datosSubArea), 
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al editar subárea:', error);
      throw error;
    }
  },

  async eliminarSubArea(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/subareas/${id}/`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status === 204) {
        return { success: true };
      } else {
        throw new Error('No se pudo eliminar el subárea');
      }
    } catch (error) {
      console.error('Error al eliminar subárea:', error);
      throw error;
    }
  },

  async editarUnidad(id, datosUnidad) {
    try {
      console.log('Datos de la unidad a editar:', datosUnidad); 
      const response = await fetch(`${API_BASE_URL}/unidades/${id}/`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(datosUnidad), 
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al editar unidad:', error);
      throw error;
    }
  },

  async eliminarUnidad(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/unidades/${id}/`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status === 204) {
        return { success: true };
      } else {
        throw new Error('No se pudo eliminar la unidad');
      }
    } catch (error) {
      console.error('Error al eliminar unidad:', error);
      throw error;
    }
  },
};


export default api;
