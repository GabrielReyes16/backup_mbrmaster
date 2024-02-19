import React, { useState } from 'react';
import api from '../api';

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
    } catch (error) {
      console.error('Error al agregar el banco:', error);
    }
  };


  return (
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
  );
};

export default FormBanco;
