import React, { useState, useEffect  } from 'react';
import api from '../api';

const FormProveedor = () => {
  const [datosProveedor, setDatosProveedor] = useState({
    ruc_dni: '',
    nombre_razon_social: '',
    fecha_inicio: '',
    rubro_actividad_economica: '',
    comentarios: '',
    tipo: 2,
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

  const [datosBancarios, setDatosBancarios] = useState([
    {
      entidad: '',
      numero_de_cuenta: '',
      cci: '',
      tipo_de_cuenta: '',
      moneda: '',
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
      const proveedorResponse = await api.addPersona(datosProveedor);

      await Promise.all(direcciones.map(async (direccion) => {
        const direccionResponse = await api.addDireccion({
          ...direccion,
          personaId: proveedorResponse.id,
        });
        console.log("Dirección guardada:", direccionResponse);
      }));

      await Promise.all(contactos.map(async (contacto) => {
        const contactoResponse = await api.addContacto({
          ...contacto,
          personaId: proveedorResponse.id,
        });
        console.log("Contacto guardado:", contactoResponse);
      }));

      await Promise.all(datosBancarios.map(async (datosBancarios) => {
        const datosBancariosResponse = await api.addCuentaBancaria({
          ...datosBancarios,
          personaId: proveedorResponse.id,
        });
        console.log("Datos bancarios guardados:", datosBancariosResponse);
      }));

      await api.addPersonaTipoPago({
        personaId: proveedorResponse.id,
        tipoPagoId: tipoPagoSeleccionado,
      });

      console.log("Proveedor guardado:", proveedorResponse);

      // Limpiar datos después de guardar
      setDatosProveedor({
        ruc_dni: '',
        nombre_razon_social: '',
        fecha_inicio: '',
        rubro_actividad_economica: '',
        comentarios: '',
        tipo: 2,
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

      setDatosBancarios([
        {
          entidad: '',
          numero_de_cuenta: '',
          cci: '',
          tipo_de_cuenta: '',
          moneda: '',
        }
      ]);
    } catch (error) {
      console.error('Error al guardar nuevo proveedor:', error);
    }
  };

  const handleChangeTipoPago = (e) => {
    setTipoPagoSeleccionado(e.target.value);
  };


  const handleChangeProveedor = (e) => {
    const { name, value } = e.target;
    setDatosProveedor(prevState => ({
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

  const handleChangeDatosBancarios = (index, e) => {
    const { name, value } = e.target;
    const newDatosBancarios = [...datosBancarios];
    newDatosBancarios[index][name] = value;
    setDatosBancarios(newDatosBancarios);
  };

  const handleAgregarDatosBancarios = () => {
    setDatosBancarios(prevDatosBancarios => ([
      ...prevDatosBancarios,
      {
        entidad: '',
        numero_de_cuenta: '',
        cci: '',
        tipo_de_cuenta: '',
        moneda: '',
      }
    ]));
  };

  const handleEliminarDatosBancarios = (index) => {
    setDatosBancarios(prevDatosBancarios => prevDatosBancarios.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      {/* Contenido */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Nuevo Proveedor</h2>
              {/* Formulario de proveedor */}
              <div className="mb-3">
                <label className="form-label">RUC/DNI:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc_dni"
                  value={datosProveedor.ruc_dni}
                  onChange={handleChangeProveedor}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre/Razon social:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre_razon_social"
                  value={datosProveedor.nombre_razon_social}
                  onChange={handleChangeProveedor}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha inicio:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_inicio"
                  value={datosProveedor.fecha_inicio}
                  onChange={handleChangeProveedor}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rubro/Actividad economica:</label>
                <input
                  type="text"
                  className="form-control"
                  name="rubro_actividad_economica"
                  value={datosProveedor.rubro_actividad_economica}
                  onChange={handleChangeProveedor}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comentarios:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="comentarios"
                  value={datosProveedor.comentarios}
                  onChange={handleChangeProveedor}
                />
              </div>

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

              {/* Formulario de datos bancarios */}
              <h3>Datos Bancarios</h3>
              {datosBancarios.map((banco, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="form-label">Entidad:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="entidad"
                      value={banco.entidad}
                      onChange={(e) => handleChangeDatosBancarios(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Número de cuenta:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numero_de_cuenta"
                      value={banco.numero_de_cuenta}
                      onChange={(e) => handleChangeDatosBancarios(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CCI:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cci"
                      value={banco.cci}
                      onChange={(e) => handleChangeDatosBancarios(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de cuenta:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipo_de_cuenta"
                      value={banco.tipo_de_cuenta}
                      onChange={(e) => handleChangeDatosBancarios(index, e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Moneda:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="moneda"
                      value={banco.moneda}
                      onChange={(e) => handleChangeDatosBancarios(index, e)}
                    />
                  </div>
                  {/* Botón para eliminar datos bancarios */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarDatosBancarios(index)}
                  >
                    Eliminar datos bancarios
                  </button>
                </div>
              ))}

              {/* Botón para agregar datos bancarios */}
              <button
                className="btn btn-primary mt-3"
                onClick={handleAgregarDatosBancarios}
              >
                Agregar datos bancarios
              </button>

              <div className="mb-3">
                <label className="form-label">Tipo de Pago:</label>
                <select
                  className="form-select"
                  value={tipoPagoSeleccionado}
                  onChange={(e) => setTipoPagoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccionar tipo de pago</option>
                  {tiposPago.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                  ))}
                </select>
              </div>


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

export default FormProveedor;
