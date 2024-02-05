import React, { useState, useEffect } from 'react';
import api from '../api';

const NuevaArea = () => {
  const [nombreArea, setNombreArea] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [selectedUnidad, setSelectedUnidad] = useState('');

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await api.obtenerDatos();
        setUnidades(response.unidades);
      } catch (error) {
        console.error('Error al obtener unidades:', error);
      }
    };

    fetchUnidades();
  }, []);

  const handleGuardar = async () => {
    try {
      const datosArea = { nombre: nombreArea, unidad: selectedUnidad };
      const response = await api.nuevaArea(datosArea);
      console.log(response);

      setNombreArea('');
      setSelectedUnidad('');
    } catch (error) {
      console.error('Error al guardar nueva área:', error);
    }
  };

  return (
    <div>
      {/* Nuevo Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="Maestro.html">
                Maestro
              </a>
              <a className="nav-link" href="Organizacion.html">
                Organizacion
              </a>
              <a className="nav-link disabled" aria-disabled="true">
                Nueva Area
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenedor del formulario */}
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4">Nueva Área</h2>
            <div className="mb-3">
              <label className="form-label">Nombre de la Área:</label>
              <input
                type="text"
                className="form-control"
                value={nombreArea}
                onChange={(e) => setNombreArea(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Seleccionar Unidad:</label>
              <select
                className="form-select"
                value={selectedUnidad}
                onChange={(e) => setSelectedUnidad(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                {unidades.map((unidad) => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaArea;
