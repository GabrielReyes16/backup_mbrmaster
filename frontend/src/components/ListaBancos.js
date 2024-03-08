import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import api from '../api';
import EditarBancoModal from './EditarBancoModal';

const ListaBancos = () => {
  const [bancos, setBancos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bancoIdToDelete, setBancoIdToDelete] = useState(null);
  const [bancoIdToEdit, setBancoIdToEdit] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.listarBancos();
        setBancos(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleEditar = (id) => {
    setBancoIdToEdit(id); 
    setModalIsOpen(true); 
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro que deseas eliminar este banco?');
    if (confirmacion) {
      try {
        await api.eliminarBanco(id);
        const updatedBancos = bancos.filter(banco => banco.id !== id);
        setBancos(updatedBancos);
      } catch (error) {
        console.error('Error al eliminar el banco:', error);
      }
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
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Contenedor del formulario */}

    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Bancos</h2>
        <Link to="/menu/banco/agregar" className="btn btn-primary">
          Agregar Banco
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por ID/NOMBRE"
          value={busqueda}
          onChange={handleBusquedaChange}
          className="form-control"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Moneda</th>
            <th>Tipo de Cuenta</th>
            <th>Fecha de apertura</th>
            <th>Número de cuenta</th>
            <th>CCI</th>
            <th>Funcionario</th>
            <th>Agencia de apertura</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bancos.map((banco) => (
            <tr key={banco.id}>
              <td>{banco.id}</td>
              <td>{banco.nombre}</td>
              <td>{banco.moneda}</td>
              <td>{banco.tipo_cuenta}</td>
              <td>{banco.fecha_apertura}</td>
              <td>{banco.numero_cuenta}</td>
              <td>{banco.cci}</td>
              <td>{banco.funcionario}</td>
              <td>{banco.agencia_apertura}</td>
              <td>{banco.estado}</td>
              <td>
                <button onClick={() => handleEditar(banco.id)} className="btn btn-sm btn-primary mr-2">Editar</button>
                <button onClick={() => handleEliminar(banco.id)} className="btn btn-sm btn-danger mr-2">Eliminar</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditarBancoModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} bancoId={bancoIdToEdit} />
      
    </div>
    
    </div>
  );
};

export default ListaBancos;
