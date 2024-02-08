import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Consultas = () => {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.obtenerDatos();
        setData(response.areas);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleFiltrar = () => {
    return data.filter(area => {
      return area.nombre.toLowerCase().includes(filtro.toLowerCase()) || area.unidad_nombre.toLowerCase().includes(filtro.toLowerCase());
    });
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
              <Link to="/menu/maestro" className="nav-link">
                Maestro
              </Link>
              <Link to="/menu/maestro/organizacion" className="nav-link">
                Organizacion
              </Link>
              <button className="nav-link disabled" aria-disabled="true">
                Consultas
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />

      {/* Contenido de Consultas */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="mb-0">Consultas</h2>
          {/* Botón Regresar */}
          <Link to="/menu/maestro/organizacion" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
        {/* Filtro */}
        <div className="mb-3">
          <label htmlFor="filtro">Filtro:</label>
          <input
            id="filtro"
            type="text"
            className="form-control"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Área</th>
              <th>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {handleFiltrar().map((area) => (
              <tr key={area.id}>
                <td>{area.nombre}</td>
                <td>{area.unidad_nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consultas;