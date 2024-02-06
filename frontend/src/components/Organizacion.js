import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Organizacion = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body" data-bs-theme="dark">
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
              <button className="nav-link" disabled>
                Organizacion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Resto del código */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <Link to="/menu/maestro/organizacion/nueva_unidad" className="btn btn-primary">
                Nueva Unidad
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <Link to="/menu/maestro/organizacion/nueva_area" className="btn btn-primary">
                Nueva Area
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://fececo.org.ar/wp-content/uploads/2022/06/personas-usuarios.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <Link to="/menu/maestro/organizacion/consultar" className="btn btn-primary">
                Consultas
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Organizacion;
