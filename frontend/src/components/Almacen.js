import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Almacen = () => {
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
                <Link to="/menu/gastos" className="nav-link">
                  Gastos
                </Link>
                <Link to="/menu/ventas" className="nav-link">
                  Ventas
                </Link>
                <Link to="/menu/compras" className="nav-link">
                  Compras
                </Link>
                <Link to="/menu/almacen" className="nav-link">
                  Almacen
                </Link>
                <Link to="/menu/finanzas" className="nav-link">
                  Finanzas
                </Link>
                <Link to="/menu/recursos_humanos" className="nav-link">
                  Recursos Humanos
                </Link>
              </div>
            </div>
          </div>
        </nav>
      <hr />
      <div className="row">
        <div className="col-md-6 mb-3">
          <p>Holi</p>
      </div>
      </div>
      <Outlet />
    </div>
  );
};
  
export default Almacen;