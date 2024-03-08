import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../api';

const EditarClienteModal = ({ isOpen, onRequestClose, clienteId }) => {
  const [cliente, setCliente] = useState(null);
  const [editedCliente, setEditedCliente] = useState(null);
  const [contactos, setContactos] = useState([]);
  const [editedContactos, setEditedContactos] = useState([]);
  const [nuevosContactos, setNuevosContactos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [editedDirecciones, setEditedDirecciones] = useState([]);
  const [nuevasDirecciones, setNuevasDirecciones] = useState([]);
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.obtenerPersonaPorId(clienteId);
        setCliente(response);
        setEditedCliente(response);
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
      }
    };

    const fetchContactos = async () => {
      try {
        const response = await api.listarContactos();
        setContactos(response);
        const filteredContactos = response.filter(contacto => contacto.personaId === clienteId);
        setEditedContactos(filteredContactos);
      } catch (error) {
        console.error('Error al obtener los contactos del cliente:', error);
      }
    };

    const fetchDirecciones = async () => {
      try {
        const response = await api.listarDirecciones();
        setDirecciones(response);
        const filteredDirecciones = response.filter(direccion => direccion.personaId === clienteId);
        setEditedDirecciones(filteredDirecciones);
      } catch (error) {
        console.error('Error al obtener las direcciones del cliente:', error);
      }
    };

    if (isOpen && clienteId) {
      fetchCliente();
      fetchContactos();
      fetchDirecciones();
    }
  }, [isOpen, clienteId]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newEditedContactos = [...editedContactos];
    newEditedContactos[index][name] = value;
    setEditedContactos(newEditedContactos);
  };

  const handleChangeDireccion = (index, event) => {
    const { name, value } = event.target;
    const newEditedDirecciones = [...editedDirecciones];
    newEditedDirecciones[index][name] = value;
    setEditedDirecciones(newEditedDirecciones);
  };

  const handleGuardarCambios = async (event) => {
    event.preventDefault();
    try {
      await api.editarPersona(clienteId, editedCliente);
      for (let i = 0; i < contactos.length; i++) {
        await api.editarContacto(contactos[i].id, contactos[i]);
      }
      // Guardar los nuevos contactos
      for (let i = 0; i < nuevosContactos.length; i++) {
        await api.addContacto(nuevosContactos[i]);
      }

      for (let i = 0; i < direcciones.length; i++) {
        await api.editarDireccion(direcciones[i].id, direcciones[i]);
      }

      // Guardar las nuevas direcciones
      for (let i = 0; i < nuevasDirecciones.length; i++) {
        await api.addDireccion(nuevasDirecciones[i]);
      }

      onRequestClose(); // Cierra el modal después de editar el cliente
      window.location.reload(); // Recarga la página para ver los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleAgregarContacto = () => {
    // Agregar el nuevo contacto al estado de nuevos contactos
    setNuevosContactos(prevState => [...prevState, {
      nombre: '',
      cargo: '',
      telefono: '',
      correo: '',
      personaId: clienteId // Asignar el ID del cliente al nuevo contacto
    }]);
  };

  const handleAgregarNuevaDireccion = () => {
    setNuevasDirecciones(prevNuevasDirecciones => ([
      ...prevNuevasDirecciones,
      {
        direccion: '',
        distrito: '',
        provincia: '',
        departamento: '',
        pais: '',
        personaId: clienteId,
      }
    ]));
  };

  const handleNuevoContactoInputChange = (event, index) => {
    const { name, value } = event.target;
    const newNuevosContactos = [...nuevosContactos];
    newNuevosContactos[index][name] = value;
    setNuevosContactos(newNuevosContactos);
  };

  const handleNuevaDireccionInputChange = (index, event) => {
    const { name, value } = event.target;
    const newNuevasDirecciones = [...nuevasDirecciones];
    newNuevasDirecciones[index][name] = value;
    setNuevasDirecciones(newNuevasDirecciones);
  };

  const handleEliminarContactoNuevo = (index) => {
    setNuevosContactos(prevNuevosContactos => prevNuevosContactos.filter((_, i) => i !== index));
  };

  const handleEliminarNuevaDireccion = (index) => {
    setNuevasDirecciones(prevNuevasDirecciones =>
      prevNuevasDirecciones.filter((_, i) => i !== index)
    );
  };
  const handleEliminarDireccion = (index) => {
    setEditedDirecciones(prevEditedDirecciones =>
      prevEditedDirecciones.filter((_, i) => i !== index)
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Cliente"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '60%',
          maxWidth: '600px',
          margin: 'auto',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center' // Centra el contenido del modal
        }
      }}
    >
      <div className="container">
        <h2 className="mb-4">Editar Cliente</h2>
        {editedCliente && (
          <form onSubmit={handleGuardarCambios}>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" className="form-control" value={editedCliente.id} readOnly />
            </div>
            <div className="form-group">
              <label>RUC/DNI:</label>
              <input type="text" className="form-control" name="ruc_dni" value={editedCliente.ruc_dni} onChange={(event) => setEditedCliente({ ...editedCliente, ruc_dni: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Nombre/Razón Social:</label>
              <input type="text" className="form-control" name="nombre_razon_social" value={editedCliente.nombre_razon_social} onChange={(event) => setEditedCliente({ ...editedCliente, nombre_razon_social: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Fecha de Inicio:</label>
              <input type="text" className="form-control" name="fecha_inicio" value={editedCliente.fecha_inicio} onChange={(event) => setEditedCliente({ ...editedCliente, fecha_inicio: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Rubro/Actividad Económica:</label>
              <input type="text" className="form-control" name="rubro_actividad_economica" value={editedCliente.rubro_actividad_economica} onChange={(event) => setEditedCliente({ ...editedCliente, rubro_actividad_economica: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Comentarios:</label>
              <input type="text" className="form-control" name="comentarios" value={editedCliente.comentarios} onChange={(event) => setEditedCliente({ ...editedCliente, comentarios: event.target.value })} />
            </div>
            {/* Otros campos del cliente */}
            <div>
              <h3>Contactos:</h3>
              {editedContactos.map((contacto, index) => (
                <div key={index}>
                  <p>Nombre: <input type='text' className='form-control' name="nombre" value={contacto.nombre} onChange={(event) => handleInputChange(event, index)} /></p>
                  <p>Cargo: <input type='text' className='form-control' name="cargo" value={contacto.cargo} onChange={(event) => handleInputChange(event, index)} /></p>
                  <p>Teléfono: <input type='text' className='form-control' name="telefono" value={contacto.telefono} onChange={(event) => handleInputChange(event, index)} /></p>
                  <p>Correo: <input type='text' className='form-control' name="correo" value={contacto.correo} onChange={(event) => handleInputChange(event, index)} /></p>
                </div>
              ))}
              {/* Campos para los nuevos contactos */}
              {nuevosContactos.map((contacto, index) => (
                <div key={index}>
                  <p>Nombre: <input type='text' className='form-control' name="nombre" value={contacto.nombre} onChange={(event) => handleNuevoContactoInputChange(event, index)} /></p>
                  <p>Cargo: <input type='text' className='form-control' name="cargo" value={contacto.cargo} onChange={(event) => handleNuevoContactoInputChange(event, index)} /></p>
                  <p>Teléfono: <input type='text' className='form-control' name="telefono" value={contacto.telefono} onChange={(event) => handleNuevoContactoInputChange(event, index)} /></p>
                  <p>Correo: <input type='text' className='form-control' name="correo" value={contacto.correo} onChange={(event) => handleNuevoContactoInputChange(event, index)} /></p>
                  {/* Botón para eliminar nuevo contacto */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarContactoNuevo(index)}
                  >
                    Eliminar contacto
                  </button>
                </div>
              ))}
              {/* Botón para agregar nuevo contacto */}
              <button type="button" onClick={handleAgregarContacto} className="btn btn-primary">Agregar Contacto</button>
            </div>
            <div>
              <h3>Direcciones:</h3>
              {editedDirecciones.map((direccion, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input type="text" className="form-control" name="direccion" value={direccion.direccion} onChange={(e) => handleChangeDireccion(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Distrito:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="distrito"
                      value={direccion.distrito}
                      onChange={(e) => handleChangeDireccion(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Provincia:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="provincia"
                      value={direccion.provincia}
                      onChange={(e) => handleChangeDireccion(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Departamento:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="departamento"
                      value={direccion.departamento}
                      onChange={(e) => handleChangeDireccion(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">País:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pais"
                      value={direccion.pais}
                      onChange={(e) => handleChangeDireccion(index, e)}
                    />
                  </div>
                  {/* Botón para eliminar dirección */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarDireccion(index)}
                  >
                    Eliminar dirección
                  </button>
                </div>
              ))}
              {/* Campos para las nuevas direcciones */}
              {nuevasDirecciones.map((direccion, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={direccion.direccion}
                      onChange={(e) => handleNuevaDireccionInputChange(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Distrito:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="distrito"
                      value={direccion.distrito}
                      onChange={(e) => handleNuevaDireccionInputChange(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Provincia:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="provincia"
                      value={direccion.provincia}
                      onChange={(e) => handleNuevaDireccionInputChange(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Departamento:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="departamento"
                      value={direccion.departamento}
                      onChange={(e) => handleNuevaDireccionInputChange(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">País:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pais"
                      value={direccion.pais}
                      onChange={(e) => handleNuevaDireccionInputChange(index, e)}
                    />
                  </div>
                  {/* Botón para eliminar nueva dirección */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarNuevaDireccion(index)}
                  >
                    Eliminar dirección
                  </button>
                </div>
              ))}
              {/* Botón para agregar nueva dirección */}
              <button type="button" onClick={handleAgregarNuevaDireccion} className="btn btn-primary mt-4">Agregar direccion</button>
            </div>

            {/* Botón de guardar */}
            <button type="submit" className="btn btn-success mt-4">Guardar Cambios</button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default EditarClienteModal;
