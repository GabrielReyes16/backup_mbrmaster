import React, { useState, useEffect } from 'react';
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

  const handleEnlaceClic = (id) => {
    console.log(`Se hizo clic en el enlace del cliente con ID: ${id}`);
    // Agrega aquí cualquier lógica adicional que desees realizar al hacer clic en el enlace
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.ruc_dni.includes(busqueda) || cliente.nombre_razon_social.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Clientes</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por RUC/DNI o por Nombre/Razón Social"
          value={busqueda}
          onChange={handleBusquedaChange}
          className="form-control"
        />
      </div>
      <table className="table">
        <thead>
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
              <td><a href={`/menu/cliente/editar/${cliente.id}`}>{cliente.id}</a></td>
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
  );
};

export default ListaClientes;
