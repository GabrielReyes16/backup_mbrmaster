import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Maestro = () => {
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
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Aqui podrá observar los usuarios registrados.</p>
              <Link to="/menu/usuarios" className="btn btn-primary">
                Vamos a Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://fececo.org.ar/wp-content/uploads/2022/06/personas-usuarios.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Proveedores</h5>
              <p className="card-text">Aqui podrá observar los tipos de usuarios.</p>
              <Link to="/menu/tipo_usuarios" className="btn btn-primary">
                Vamos a Tipos de Usuario
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://magautos.cl/wp-content/uploads/2022/07/Reserva.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Bancos</h5>
              <p className="card-text">Aqui podrá observar las reservas.</p>
              <Link to="/menu/reservas" className="btn btn-primary">
                Vamos a Reservas
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://elcomercio.pe/resizer/mBGybaqXrcaKEHgxaqqFEVjViK8=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/K6WKL3WUVZG35O7KCDM2X6LHH4.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Catalogos</h5>
              <p className="card-text">Aqui podrá observar los paseos.</p>
              <Link to="/menu/paseos" className="btn btn-primary">
                Vamos a Paseos
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://s1.eestatic.com/2015/10/12/elandroidelibre/el_androide_libre_71003130_179986200_1706x960.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Organizacion</h5>
              <p className="card-text">Aqui podrá observar las locaciones de los paseadores.</p>
              <Link to="/menu/locacion_paseadores" className="btn btn-primary">
                Vamos a Locacion Paseador
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ width: '18rem' }}>
            <img src="https://conceptodefinicion.de/wp-content/uploads/2019/02/Localizaci%C3%B3n-1.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Tablas Generales</h5>
              <p className="card-text">Aqui podrá observar las locaciones de los propietarios.</p>
              <Link to="/menu/locacion_propietarios" className="btn btn-primary">
                Vamos a Locacion Propietario
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
  
export default Maestro;