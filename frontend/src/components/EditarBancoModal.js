import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../api';

const EditarBancoModal = ({ isOpen, onRequestClose, bancoId }) => {
  const [banco, setBanco] = useState(null);
  const [editedBanco, setEditedBanco] = useState(null);

  useEffect(() => {
    const fetchBanco = async () => {
      try {
        const response = await api.obtenerBancoPorId(bancoId);
        setBanco(response);
        setEditedBanco(response); // Inicializa el estado del banco editado con los datos del banco actual
      } catch (error) {
        console.error('Error al obtener el banco:', error);
      }
    };
    
    if (isOpen && bancoId) {
      fetchBanco();
    }
  }, [isOpen, bancoId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBanco({ ...editedBanco, [name]: value });
  };

  const handleGuardarCambios = async (event) => {
    event.preventDefault();
    try {
      await api.editarBanco(bancoId, editedBanco);
      onRequestClose(); // Cierra el modal después de editar el banco
      window.location.reload(); // Recarga la página para ver los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Banco"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '400px',
          margin: 'auto',
          padding: '20px',
        }
      }}
    >
      <div className="container">
        <h2 className="mb-4">Editar Banco</h2>
        {editedBanco && (
          <form onSubmit={handleGuardarCambios}>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" className="form-control" value={editedBanco.id} readOnly />
            </div>
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" className="form-control" name="nombre" value={editedBanco.nombre} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Moneda:</label>
              <input type="text" className="form-control" name="moneda" value={editedBanco.moneda} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tipo de Cuenta:</label>
              <input type="text" className="form-control" name="tipo_cuenta" value={editedBanco.tipo_cuenta} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Fecha de Apertura:</label>
              <input type="text" className="form-control" name="fecha_apertura" value={editedBanco.fecha_apertura} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Número de Cuenta:</label>
              <input type="text" className="form-control" name="numero_cuenta" value={editedBanco.numero_cuenta} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>CCI:</label>
              <input type="text" className="form-control" name="cci" value={editedBanco.cci} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Funcionario:</label>
              <input type="text" className="form-control" name="funcionario" value={editedBanco.funcionario} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Agencia de Apertura:</label>
              <input type="text" className="form-control" name="agencia_apertura" value={editedBanco.agencia_apertura} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <input type="text" className="form-control" name="estado" value={editedBanco.estado} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default EditarBancoModal;
