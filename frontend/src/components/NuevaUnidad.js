import React, { useState } from 'react';
import api from '../api';

const NuevaUnidad = () => {
  const [nombreUnidad, setNombreUnidad] = useState('');

  const handleGuardar = async () => {
    try {
      const datosUnidad = { nombre: nombreUnidad };
      const response = await api.nuevaUnidad(datosUnidad);
      console.log(response);

      setNombreUnidad('');
    } catch (error) {
      console.error('Error al guardar nueva unidad:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
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
                Nueva Unidad
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Nueva Unidad</h2>
                <div className="mb-3">
                  <label className="form-label">Nombre de la Unidad:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreUnidad}
                    onChange={(e) => setNombreUnidad(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleGuardar}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaUnidad;
