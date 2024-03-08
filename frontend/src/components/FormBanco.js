import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom'

const FormBanco = () => {
  const [datosBanco, setDatosBanco] = useState({
    nombre: '',
    moneda: '',
    tipo_cuenta: '',
    fecha_apertura: '',
    numero_cuenta: '',
    cci: '',
    funcionario: '',
    agencia_apertura: '',
    estado: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosBanco({ ...datosBanco, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bancoAgregado = await api.addBanco(datosBanco);
      console.log('Banco agregado:', bancoAgregado);
      // Limpiar el formulario después de agregar el banco
      setDatosBanco({
        nombre: '',
        moneda: '',
        tipo_cuenta: '',
        fecha_apertura: '',
        numero_cuenta: '',
        cci: '',
        funcionario: '',
        agencia_apertura: '',
        estado: '',
      });
      alert("El Banco se ha agregado correctamente");
    } catch (error) {
      console.error('Error al guardar nuevo Banco:', error);
      // Mostrar alerta de error
      alert("Error al guardar nuevo Banco. Por favor, revise los campos e inténtelo de nuevo");
    }
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
              <Link to="/menu/bancos" className="nav-link">
                Bancos
              </Link>
              <Link to="/menu/bancos/agregar" className="nav-link">
                Agregar
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Contenedor del formulario */}
    <div className="container mt-4">
      <h2>Agregar Banco</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={datosBanco.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Moneda</label>
          <input
            type="text"
            name="moneda"
            value={datosBanco.moneda}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Cuenta</label>
          <input
            type="text"
            name="tipo_cuenta"
            value={datosBanco.tipo_cuenta}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Apertura</label>
          <input
            type="date"
            name="fecha_apertura"
            value={datosBanco.fecha_apertura}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Cuenta</label>
          <input
            type="text"
            name="numero_cuenta"
            value={datosBanco.numero_cuenta}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>CCI</label>
          <input
            type="text"
            name="cci"
            value={datosBanco.cci}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Funcionario</label>
          <input
            type="text"
            name="funcionario"
            value={datosBanco.funcionario}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Agencia de Apertura</label>
          <input
            type="text"
            name="agencia_apertura"
            value={datosBanco.agencia_apertura}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={datosBanco.estado}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option>Seleccionar</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Banco
        </button>
      </form>
    </div>
    </div>
  );
};

export default FormBanco;
