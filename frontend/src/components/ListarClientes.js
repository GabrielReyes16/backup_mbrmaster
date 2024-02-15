import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../api';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseClientes = await api.listarClientes();
        const responseContactos = await api.listarContactos();
        const responseDirecciones = await api.listarDirecciones();
        
        // Filtrar clientes que pertenecen al tipo 1
        const clientesTipo1 = responseClientes.filter(cliente => cliente.tipo === 1);
        setClientes(clientesTipo1);
        setContactos(responseContactos);
        setDirecciones(responseDirecciones);
      } catch (error) {
        console.error('Error al obtener datos de clientes:', error);
      }
    };

    fetchData();
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.ruc_dni.includes(busqueda) || cliente.nombre_razon_social.toLowerCase().includes(busqueda.toLowerCase())
  );

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Clientes</h2>
        <Link to="/menu/cliente/agregar" className="btn btn-primary">
          Agregar Cliente
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por RUC/DNI o por Nombre/Razón Social"
          value={busqueda}
          onChange={handleBusquedaChange}
          className="form-control"
        />
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>RUC/DNI</th>
            <th>Nombre/Razón Social</th>
            <th>Fecha de Inicio</th>
            <th>Rubro/Actividad Económica</th>
            <th>Comentarios</th>
            <th>Contactos</th>
            <th>Direcciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td><Link to={`/menu/cliente/editar/${cliente.id}`}>{cliente.id}</Link></td>
              <td>{cliente.ruc_dni}</td>
              <td>{cliente.nombre_razon_social}</td>
              <td>{cliente.fecha_inicio}</td>
              <td>{cliente.rubro_actividad_economica}</td>
              <td>{cliente.comentarios}</td>
              <td>
                {/* Mostrar los contactos del cliente */}
                {contactos
                  .filter(contacto => contacto.personaId === cliente.id)
                  .map(contacto => (
                    <div key={contacto.id}>
                      <p>Nombre: {contacto.nombre}</p>
                      <p>Cargo: {contacto.cargo}</p>
                      <p>Teléfono: {contacto.telefono}</p>
                      <p>Correo: {contacto.correo}</p>
                    </div>
                  ))}
              </td>
              <td>
                {/* Mostrar las direcciones del cliente */}
                {direcciones
                  .filter(direccion => direccion.personaId === cliente.id)
                  .map(direccion => (
                    <div key={direccion.id}>
                      <p>Dirección: {direccion.direccion}</p>
                      <p>Distrito: {direccion.distrito}</p>
                      <p>Provincia: {direccion.provincia}</p>
                      <p>Departamento: {direccion.departamento}</p>
                      <p>País: {direccion.pais}</p>
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>
  );
};

export default ListaClientes;
