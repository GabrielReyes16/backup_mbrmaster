import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Consultas2 = () => {
  const [subareas, setSubareas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
  const [subareaEditando, setSubareaEditando] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({
    nombre: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await api.obtenerSubAreas();
      setSubareas(response);
      setResultados(response);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    filtrarSubAreas(event.target.value);
  };

  const filtrarSubAreas = (textoFiltro) => {
    const subareasFiltradas = subareas.filter(subarea =>
      subarea.nombre.toLowerCase().includes(textoFiltro.toLowerCase())
    );
    setResultados(subareasFiltradas);
  };

  const handleEditar = (subarea) => {
    setSubareaEditando(subarea);
    setDatosEdicion({
      nombre: subarea.nombre
    });
  };
  
  const handleGuardarEdicion = async () => {
    try {
      // Pasar los datos directamente, sin envolverlos en un objeto "subarea"
      await api.editarSubArea(subareaEditando.id, datosEdicion);
      cargarDatos();
      setSubareaEditando(null);
      console.log("Subárea editada:", subareaEditando.id);
    } catch (error) {
      console.error('Error al editar subárea:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setSubareaEditando(null);
    setDatosEdicion({
      nombre: ''
    });
  };

  const handleEliminar = async (id) => {
    try {
      await api.eliminarSubArea(id);
      cargarDatos();
      console.log("Subárea eliminada con ID:", id);
    } catch (error) {
      console.error('Error al eliminar subárea:', error);
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
          <h2>Subáreas</h2>
          <Link to="/menu/maestro/organizacion" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar subárea"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Subárea</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map(subarea => (
              <tr key={subarea.id}>
                <td>{subareaEditando === subarea ? <input type="text" value={datosEdicion.nombre} onChange={(e) => setDatosEdicion({...datosEdicion, nombre: e.target.value})} /> : subarea.nombre}</td>
                <td>
                  {subareaEditando === subarea ? (
                    <>
                      <button className="btn btn-success" onClick={handleGuardarEdicion}>Guardar</button>
                      <button className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => handleEditar(subarea)}>Editar</button>
                      <button className="btn btn-danger ms-2" onClick={() => handleEliminar(subarea.id)}>Eliminar</button>
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

export default Consultas2;
