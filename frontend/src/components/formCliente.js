import React, { useState, useEffect  } from 'react';
import api from '../api';

const FormCliente = () => {
  const [datosCliente, setDatosCliente] = useState({
    ruc_dni: '',
    nombre_razon_social: '',
    fecha_inicio: '',
    rubro_actividad_economica: '',
    comentarios: '',
    tipo: 1,
  });

  const [direcciones, setDirecciones] = useState([
    {
      direccion: '',
      distrito: '',
      provincia: '',
      departamento: '',
      pais: '',
    }
  ]);

  const [contactos, setContactos] = useState([
    {
      nombre: '',
      cargo: '',
      telefono: '',
      correo: '',
    }
  ]);

  const [tiposPago, setTiposPago] = useState([]);
  const [tipoPagoSeleccionado, setTipoPagoSeleccionado] = useState(''); // Define tipoPagoSeleccionado y setTipoPagoSeleccionado


  useEffect(() => {
    const listarTiposPago = async () => {
      try {
        const response = await api.listarTiposPago();
        setTiposPago(response);
      } catch (error) {
        console.error('Error al obtener los tipos de pago:', error);
      }
    };

    listarTiposPago();
  }, []);


  const handleGuardar = async () => {
    try {
      const clienteResponse = await api.addPersona(datosCliente);

      await Promise.all(direcciones.map(async (direccion) => {
        const direccionResponse = await api.addDireccion({
          ...direccion,
          personaId: clienteResponse.id,
        });
        console.log("Dirección guardada:", direccionResponse);
      }));

      await Promise.all(contactos.map(async (contacto) => {
        const contactoResponse = await api.addContacto({
          ...contacto,
          personaId: clienteResponse.id,
        });
        console.log("Contacto guardado:", contactoResponse);
      }));

      await api.addPersonaTipoPago({
        personaId: clienteResponse.id,
        tipoPagoId: tipoPagoSeleccionado,
      });

      console.log("Cliente guardado:", clienteResponse);

      // Limpiar datos después de guardar
      setDatosCliente({
        ruc_dni: '',
        nombre_razon_social: '',
        fecha_inicio: '',
        rubro_actividad_economica: '',
        comentarios: '',
        tipo: 1,
      });

      setDirecciones([
        {
          direccion: '',
          distrito: '',
          provincia: '',
          departamento: '',
          pais: '',
        }
      ]);

      setContactos([
        {
          nombre: '',
          cargo: '',
          telefono: '',
          correo: '',
        }
      ]);
    } catch (error) {
      console.error('Error al guardar nuevo cliente:', error);
    }
  };

  const handleChangeTipoPago = (e) => {
    setTipoPagoSeleccionado(e.target.value);
  };

  const handleChangeCliente = (e) => {
    const { name, value } = e.target;
    setDatosCliente(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDireccion = (index, e) => {
    const { name, value } = e.target;
    const newDirecciones = [...direcciones];
    newDirecciones[index][name] = value;
    setDirecciones(newDirecciones);
  };

  const handleAgregarDireccion = () => {
    setDirecciones(prevDirecciones => ([
      ...prevDirecciones,
      {
        direccion: '',
        distrito: '',
        provincia: '',
        departamento: '',
        pais: '',
      }
    ]));
  };

  const handleEliminarDireccion = (index) => {
    setDirecciones(prevDirecciones => prevDirecciones.filter((_, i) => i !== index));
  };

  const handleChangeContacto = (index, e) => {
    const { name, value } = e.target;
    const newContactos = [...contactos];
    newContactos[index][name] = value;
    setContactos(newContactos);
  };

  const handleAgregarContacto = () => {
    setContactos(prevContactos => ([
      ...prevContactos,
      {
        nombre: '',
        cargo: '',
        telefono: '',
        correo: '',
      }
    ]));
  };

  const handleEliminarContacto = (index) => {
    setContactos(prevContactos => prevContactos.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      {/* Contenido */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Nuevo Cliente</h2>
              {/* Formulario de cliente */}
              <div className="mb-3">
                <label className="form-label">RUC/DNI:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc_dni"
                  value={datosCliente.ruc_dni}
                  onChange={handleChangeCliente}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre/Razon social:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre_razon_social"
                  value={datosCliente.nombre_razon_social}
                  onChange={handleChangeCliente}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha inicio:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_inicio"
                  value={datosCliente.fecha_inicio}
                  onChange={handleChangeCliente}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rubro/Actividad economica:</label>
                <input
                  type="text"
                  className="form-control"
                  name="rubro_actividad_economica"
                  value={datosCliente.rubro_actividad_economica}
                  onChange={handleChangeCliente}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comentarios:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="comentarios"
                  value={datosCliente.comentarios}
                  onChange={handleChangeCliente}
                />
              </div>

              {/* Otros campos del cliente */}

              {/* Formulario de dirección */}
              <h3>Direcciones</h3>
              {direcciones.map((direccion, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={direccion.direccion}
                      onChange={(e) => handleChangeDireccion(index, e)}
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

              {/* Botón para agregar dirección */}
              <button
                className="btn btn-primary mt-3"
                onClick={handleAgregarDireccion}
              >
                Agregar dirección
              </button>

              {/* Formulario de contactos */}
              <h3>Contactos</h3>
              {contactos.map((contacto, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={contacto.nombre}
                      onChange={(e) => handleChangeContacto(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cargo:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cargo"
                      value={contacto.cargo}
                      onChange={(e) => handleChangeContacto(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={contacto.telefono}
                      onChange={(e) => handleChangeContacto(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="correo"
                      value={contacto.correo}
                      onChange={(e) => handleChangeContacto(index, e)}
                    />
                  </div>
                  {/* Botón para eliminar contacto */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarContacto(index)}
                  >
                    Eliminar contacto
                  </button>
                </div>
              ))}

              {/* Botón para agregar contacto */}
              <button
                className="btn btn-primary mt-3"
                onClick={handleAgregarContacto}
              >
                Agregar contacto
              </button>

        
              {/* Botón de guardar */}
              <button className="btn btn-primary mt-3" onClick={handleGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCliente;
