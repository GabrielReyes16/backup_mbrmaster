import React, { useState, useEffect } from 'react';
import api from '../api';

const Consultas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.obtenerDatos();
        setData(response.areas);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Consultas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Área</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((area) => (
            <tr key={area.id}>
              <td>{area.nombre}</td>
              <td>{area.unidad_nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consultas;
