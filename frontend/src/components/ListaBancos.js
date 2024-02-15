import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import api from '../api';

const ListaBancos = () => {
  const [bancos, setBancos] = useState([]);

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

  const handleEnlaceClic = (id) => {
    console.log(`Se hizo clic en el enlace del banco con ID: ${id}`);
    // Agrega aquí cualquier lógica adicional que desees realizar al hacer clic en el enlace
  };

  return (
    <div className="container mt-4">
      
      <h2 className="mb-4">Lista de Bancos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Moneda</th>
            <th>Tipo de Cuenta</th>
            <th>Fecha de apertura</th>
            <th>numero de cuenta</th>
            <th>CCI</th>
            <th>funcionario</th>
            <th>Agencia de apertura</th>
            <th>Estado</th>
            
          </tr>
        </thead>
        <tbody>
          {bancos.map((banco) => (
            
            <tr  key={banco.id}>
              <td><a href={`/menu/banco/editar/${banco.id}`}>{banco.id}</a></td>
              <td>{banco.nombre}</td>
              <td>{banco.moneda}</td>
              <td>{banco.tipo_cuenta}</td>
              <td>{banco.fecha_apertura}</td>
              <td>{banco.numero_cuenta}</td>
              <td>{banco.cci}</td>
              <td>{banco.funcionario}</td>
              <td>{banco.agencia_apertura}</td>
              <td>{banco.estado}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaBancos;
