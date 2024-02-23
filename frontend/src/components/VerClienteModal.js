import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../api';

const VerClienteModal = ({ isOpen, onRequestClose, cliente }) => {
  const [contactos, setContactos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseContactos = await api.listarContactos();
        const responseDirecciones = await api.listarDirecciones();
        setContactos(responseContactos);
        setDirecciones(responseDirecciones);
      } catch (error) {
        console.error('Error al obtener datos de clientes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ver Cliente"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '800px', // Aumenté el ancho del modal
          margin: 'auto',
          padding: '20px',
        }
      }}
    >
      <div className="container">
        <h2 className="mb-4">Detalles del Cliente</h2>
        {cliente && (
          <div>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" className="form-control" value={cliente.id} readOnly />
            </div>
            <div className="form-group">
              <label>RUC/DNI:</label>
              <input type="text" className="form-control" value={cliente.ruc_dni} readOnly />
            </div>
            <div className="form-group">
              <label>Nombre/Razón Social:</label>
              <input type="text" className="form-control" value={cliente.nombre_razon_social} readOnly />
            </div>
            <div className="form-group">
              <label>Fecha de Inicio:</label>
              <input type="text" className="form-control" value={cliente.fecha_inicio} readOnly />
            </div>
            <div className="form-group">
              <label>Rubro/Actividad Económica:</label>
              <input type="text" className="form-control" value={cliente.rubro_actividad_economica} readOnly />
            </div>
            <div className="form-group">
              <label>Comentarios:</label>
              <input type="text" className="form-control" value={cliente.comentarios} readOnly />
            </div>
  
            {/* Tabla de contactos */}
            <div>
              <h4>Contactos:</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {contactos && contactos
                    .filter(contacto => contacto.personaId === cliente.id)
                    .map(contacto => (
                      <tr key={contacto.id}>
                        <td>{contacto.nombre}</td>
                        <td>{contacto.cargo}</td>
                        <td>{contacto.telefono}</td>
                        <td>{contacto.correo}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
  
            {/* Tabla de direcciones */}
            <div>
              <h4>Direcciones:</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Dirección</th>
                    <th>Distrito</th>
                    <th>Provincia</th>
                    <th>Departamento</th>
                    <th>País</th>
                  </tr>
                </thead>
                <tbody>
                  {direcciones && direcciones
                    .filter(direccion => direccion.personaId === cliente.id)
                    .map(direccion => (
                      <tr key={direccion.id}>
                        <td>{direccion.direccion}</td>
                        <td>{direccion.distrito}</td>
                        <td>{direccion.provincia}</td>
                        <td>{direccion.departamento}</td>
                        <td>{direccion.pais}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
  
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VerClienteModal;
