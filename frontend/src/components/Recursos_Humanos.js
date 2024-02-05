import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Recursos_Humanos = () => {
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body" data-bs-theme="dark">
          <div className="container-fluid">
           <Link to="/menu" className="nav-link">
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
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Tipo de Documento</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Sistema de Pensiones</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Estado Civil</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nivel Académico</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Idiomas</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://i.pinimg.com/474x/c0/d1/da/c0d1da39c107f4f840789bb58b890aeb.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nivel</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
  
export default Recursos_Humanos;