import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ConsultasUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
  const [unidadEditando, setUnidadEditando] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({
    nombre: '',
    area: '',
    subarea: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const { unidades, areas, subareas } = await api.obtenerDatos();
      setUnidades(unidades);
      setResultados(unidades);
      setAreas(areas);
      setSubareas(subareas);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    filtrarUnidades(event.target.value);
  };

  const filtrarUnidades = (textoFiltro) => {
    const unidadesFiltradas = unidades.filter(unidad =>
      (
        (typeof unidad.area === 'string' && unidad.area.toLowerCase().includes(textoFiltro.toLowerCase())) ||
        (typeof unidad.subarea === 'string' && unidad.subarea.toLowerCase().includes(textoFiltro.toLowerCase())) ||
        unidad.nombre.toLowerCase().includes(textoFiltro.toLowerCase())
      )
    );
    setResultados(unidadesFiltradas);
  };

  const handleEditar = (unidad) => {
    setUnidadEditando(unidad);
    setDatosEdicion({
      nombre: unidad.nombre,
      area: unidad.area,
      subarea: unidad.subarea
    });
  };

  const handleGuardarEdicion = async () => {
    try {
      const areaId = areas.find(area => area.nombre === datosEdicion.area)?.id;
      const subareaId = subareas.find(subarea => subarea.nombre === datosEdicion.subarea)?.id;
  
      if (!areaId || !subareaId) {
        console.error('Área o subárea no encontrada.');
        return;
      }
  
      await api.editarUnidad(unidadEditando.id, {
        ...datosEdicion,
        area: areaId,
        subarea: subareaId
      });
  
      cargarDatos();
      setUnidadEditando(null);
      console.log("Unidad editada:", unidadEditando.id);
    } catch (error) {
      console.error('Error al editar unidad:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setUnidadEditando(null);
    setDatosEdicion({
      nombre: '',
      area: '',
      subarea: ''
    });
  };

  const handleEliminar = async (id) => {
    try {
      await api.eliminarUnidad(id);
      cargarDatos();
      console.log("Unidad eliminada con ID:", id);
    } catch (error) {
      console.error('Error al eliminar unidad:', error);
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
          <h2>Consulta General</h2>
          <Link to="/menu/maestro/organizacion" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar unidad, área o subárea"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Área</th>
              <th>Subárea</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map(unidad => (
              <tr key={unidad.id}>
                <td>{unidadEditando === unidad ? <input type="text" value={datosEdicion.nombre} onChange={(e) => setDatosEdicion({...datosEdicion, nombre: e.target.value})} /> : unidad.nombre}</td>
                <td>
                  {unidadEditando === unidad ? (
                    <select
                      className="form-select"
                      value={datosEdicion.area}
                      onChange={(e) => setDatosEdicion({...datosEdicion, area: e.target.value})}
                    >
                      <option value="">Seleccionar área</option>
                      {areas.map(area => (
                        <option key={area.id} value={area.nombre}>{area.nombre}</option>
                      ))}
                    </select>
                  ) : (
                    // Mostrar el nombre del área en lugar del ID
                    <span>{areas.find(area => area.id === unidad.area)?.nombre}</span>
                  )}
                </td>
                <td>
                  {unidadEditando === unidad ? (
                    <select
                      className="form-select"
                      value={datosEdicion.subarea}
                      onChange={(e) => setDatosEdicion({...datosEdicion, subarea: e.target.value})}
                    >
                      <option value="">Seleccionar subárea</option>
                      {subareas.map(subarea => (
                        <option key={subarea.id} value={subarea.nombre}>{subarea.nombre}</option>
                      ))}
                    </select>
                  ) : (
                    // Mostrar el nombre de la subárea en lugar del ID
                    <span>{subareas.find(subarea => subarea.id === unidad.subarea)?.nombre}</span>
                  )}
                </td>
                <td>
                  {unidadEditando === unidad ? (
                    <>
                      <button className="btn btn-success" onClick={handleGuardarEdicion}>Guardar</button>
                      <button className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => handleEditar(unidad)}>Editar</button>
                      <button className="btn btn-danger ms-2" onClick={() => handleEliminar(unidad.id)}>Eliminar</button>
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

export default ConsultasUnidades;