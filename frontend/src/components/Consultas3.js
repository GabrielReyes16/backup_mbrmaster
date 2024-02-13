import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Consultas3 = () => {
  const [areas, setAreas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
  const [areaEditando, setAreaEditando] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({
    nombre: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await api.obtenerAreas();
      setAreas(response);
      setResultados(response);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    filtrarAreas(event.target.value);
  };

  const filtrarAreas = (textoFiltro) => {
    const areasFiltradas = areas.filter(area =>
      area.nombre.toLowerCase().includes(textoFiltro.toLowerCase())
    );
    setResultados(areasFiltradas);
  };

  const handleEditar = (area) => {
    setAreaEditando(area);
    setDatosEdicion({
      nombre: area.nombre
    });
  };
  
  const handleGuardarEdicion = async () => {
    try {
      // Pasar los datos directamente, sin envolverlos en un objeto "area"
      await api.editarArea(areaEditando.id, datosEdicion);
      cargarDatos();
      setAreaEditando(null);
      console.log("Área editada:", areaEditando.id);
    } catch (error) {
      console.error('Error al editar área:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setAreaEditando(null);
    setDatosEdicion({
      nombre: ''
    });
  };

  const handleEliminar = async (id) => {
    try {
      await api.eliminarArea(id);
      cargarDatos();
      console.log("Área eliminada con ID:", id);
    } catch (error) {
      console.error('Error al eliminar área:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom border-body" style={{ background: 'linear-gradient(to right, #3498db, #2c3e50)'}} data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/menu" className="navbar-brand">
            Dashboard
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/menu/maestro" className="nav-link">
                Maestro
              </Link>
              <Link to="/menu/maestro/organizacion" className="nav-link">
                Organización
              </Link>
              <button className="nav-link disabled" aria-disabled="true">
                Consultas
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Áreas</h2>
          <Link to="/menu/maestro/organizacion" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar área"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Área</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map(area => (
              <tr key={area.id}>
                <td>{areaEditando === area ? <input type="text" value={datosEdicion.nombre} onChange={(e) => setDatosEdicion({...datosEdicion, nombre: e.target.value})} /> : area.nombre}</td>
                <td>
                  {areaEditando === area ? (
                    <>
                      <button className="btn btn-success" onClick={handleGuardarEdicion}>Guardar</button>
                      <button className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => handleEditar(area)}>Editar</button>
                      <button className="btn btn-danger ms-2" onClick={() => handleEliminar(area.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consultas3;
