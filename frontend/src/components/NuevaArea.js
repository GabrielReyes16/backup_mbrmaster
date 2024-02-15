import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const NuevaArea = () => {
  const [nombreArea, setNombreArea] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleGuardar = async () => {
    try {
      const datosArea = { nombre: nombreArea };
      const response = await api.nuevaArea(datosArea);
      console.log(response);

      setNombreArea('');
      setMensaje('Área guardada correctamente.');
      setTimeout(() => {
        setMensaje('');
      }, 3000); 
    } catch (error) {
      console.error('Error al guardar nueva área:', error);
      setMensaje('Error al guardar el área. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark border-bottom border-body"
        style={{
          background: '#2c3e50',
          background: '-webkit-linear-gradient(to right, #3498db, #2c3e50)',
          background: 'linear-gradient(to right, #3498db, #2c3e50)'
        }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to="/menu" className="navbar-brand">
            Dashboard
          </Link>
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
              <Link to="/menu/maestro" className="nav-link">z
                Maestro
              </Link>
              <Link to="/menu/maestro/organizacion" className="nav-link">
                Organizacion
              </Link>
              {/* Use a button instead of an anchor for a disabled link */}
              <button className="nav-link disabled" aria-disabled="true">
                Nueva Area
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Contenedor del formulario */}
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4">Nueva Área</h2>
            {mensaje && <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'}`} role="alert">
              {mensaje}
            </div>}
            <div className="mb-3">
              <label className="form-label">Nombre de la Área:</label>
              <input
                type="text"
                className="form-control"
                value={nombreArea}
                onChange={(e) => setNombreArea(e.target.value)}
              />
            </div>
       
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleGuardar}>
                Guardar
              </button>
              <Link to="/menu/maestro/organizacion" className="btn btn-secondary">
                Regresar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaArea;
