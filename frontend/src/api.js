const API_BASE_URL = 'http://127.0.0.1:8000/mbr/api';

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

  /* Contenido trabajado por Yeffer */

  async listarBancos() {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/bancos/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data; // Retorna el array de bancos
    } catch (error) {
      console.error('Error al listar bancos:', error);
      throw error;
    }
  },

  async listarClientes() {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/personas/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const persona = await response.json();
      return persona; 
    } catch (error) {
      console.error('Error al listar bancos:', error);
      throw error;
    }
  },

  async addPersona(datosCliente) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/personas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCliente),
        credentials: 'include',
      });
      const clienteAgregado = await response.json();
      return clienteAgregado;
    } catch (error) {
      console.error('Error al añadir cliente:', error);
      throw error;
    }
  },

  async addDireccion(datosDireccion) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/direcciones/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosDireccion),
        credentials: 'include',
      });
      const direccionAgregada = await response.json();
      return direccionAgregada;
    } catch (error) {
      console.error('Error al añadir dirección:', error);
      throw error;
    }
  },

  async addContacto(datosContacto) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/contactos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosContacto),
      credentials: 'include',
    });
    const contactoAgregado = await response.json();
    return contactoAgregado;
  } catch (error) {
    console.error('Error al añadir contacto:', error);
    throw error;
  }
},

async addCuentaBancaria(datosCuenta) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/cuentasBancarias/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCuenta),
      credentials: 'include',
    });
    const cuentaAgregada = await response.json();
    return cuentaAgregada;
  } catch (error) {
    console.error('Error al añadir cuenta bancaria:', error);
    throw error;
  }
},

async listarContactos() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/contactos/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const contactos = await response.json();
    return contactos;
  } catch (error) {
    console.error('Error al listar contactos:', error);
    throw error;
  }
},

async listarDirecciones() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/direcciones/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const direcciones = await response.json();
    return direcciones;
  } catch (error) {
    console.error('Error al listar direcciones:', error);
    throw error;
  }
},

async listarTiposPago() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tiposPago/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const tiposPago = await response.json();
    return tiposPago;
  } catch (error) {
    console.error('Error al listar tipos de pago:', error);
    throw error;
  }
},


async addPersonaTipoPago(datosPersonaTipoPago) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaTiposPago/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPersonaTipoPago),
      credentials: 'include',
    });
    const personaTipoPagoAgregada = await response.json();
    return personaTipoPagoAgregada;
  } catch (error) {
    console.error('Error al añadir el tipo de pago:', error);
    throw error;
  }
},

async listarImpuestosAsociados() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/impuestosAsociados/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const impuestosAsociados = await response.json();
    return impuestosAsociados;
  } catch (error) {
    console.error('Error al listar tipos de impuestos asociados:', error);
    throw error;
  }
},

async addPersonaImpuestoAsociado(datosPersonaImpuestoAsociado) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaImpuestosAsociados/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPersonaImpuestoAsociado),
      credentials: 'include',
    });
    const personaImpuestoAsociadoAgregada = await response.json();
    return personaImpuestoAsociadoAgregada;
  } catch (error) {
    console.error('Error al añadir el tipo de pago:', error);
    throw error;
  }
},

async addBanco(datosBanco) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bancos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosBanco),
      credentials: 'include',
    });
    const bancoAgregado = await response.json();
    return bancoAgregado;
  } catch (error) {
    console.error('Error al añadir el banco:', error);
    throw error;
  }
},

async obtenerBancoPorId(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bancos/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Error al obtener el banco');
    }
    const banco = await response.json();
    return banco;
  } catch (error) {
    console.error('Error al obtener el banco por ID:', error);
    throw error;
  }
},

async editarBanco(id, datosBanco) {
  try {
    console.log('Datos de la unidad a editar:', datosBanco); 
    const response = await fetch(`${API_BASE_URL}/v1/bancos/${id}/`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosBanco), 
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar banco:', error);
    throw error;
  }
},

async eliminarBanco(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bancos/${id}/`, { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status === 204) {
      return { success: true };
    } else {
      throw new Error('No se pudo eliminar el Banco');
    }
  } catch (error) {
    console.error('Error al eliminar Banco:', error);
    throw error;
  }
},


async obtenerPersonaPorId(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personas/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Error al obtener persona');
    }
    const persona = await response.json();
    return persona;
  } catch (error) {
    console.error('Error al obtener persona por ID:', error);
    throw error;
  }

},

async editarPersona(id, datosPersona) {
  try {
    console.log('Datos de la unidad a editar:', datosPersona); 
    const response = await fetch(`${API_BASE_URL}/v1/personas/${id}/`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosPersona), 
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar persona:', error);
    throw error;
  }
},

async eliminarPersona(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personas/${id}/`, { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status === 204) {
      return { success: true };
    } else {
      throw new Error('No se pudo eliminar el persona');
    }
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    throw error;
  }
},

async editarContacto(id, datosContacto) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/contactos/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosContacto),
    });

    if (!response.ok) {
      throw new Error('Error al editar el contacto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar contacto:', error);
    throw error;
  }
},

async editarDireccion(id, datosDireccion) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/direcciones/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosDireccion),
    });

    if (!response.ok) {
      throw new Error('Error al editar el direccion');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar direccion:', error);
    throw error;
  }
},

async listarPersonaTiposPago() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaTiposPago/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const PersonatiposPago = await response.json();
    return PersonatiposPago;
  } catch (error) {
    console.error('Error al listar persoona tipos de pago:', error);
    throw error;
  }
},

async listarPersonaImpuestosAsociados() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaImpuestosAsociados/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const PersonaImpuestosAsociados = await response.json();
    return PersonaImpuestosAsociados;
  } catch (error) {
    console.error('Error al listar persoona tipos de pago:', error);
    throw error;
  }
},

async editarPersonaImpuestosAsociados(id, datosPersonaImpuestosAsociados) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaImpuestosAsociados/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosPersonaImpuestosAsociados),
    });

    if (!response.ok) {
      throw new Error('Error al editar datosPersonaImpuestosAsociados ');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar datosPersonaImpuestosAsociados :', error);
    throw error;
  }
},

async editarPersonaTipoPago(id, datosPersonaTipoPago) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/personaTiposPago/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(datosPersonaTipoPago),
    });

    if (!response.ok) {
      throw new Error('Error al editar datosPersonaTipoPago ');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar datosPersonaTipoPago :', error);
    throw error;
  }
},












/* Contenido trabajado por Yeffer */









};


export default api;
