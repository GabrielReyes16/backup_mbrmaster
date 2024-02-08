import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Menu = () => {
  const { logoutUser } = useContext(AuthContext);

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
              <button onClick={logoutUser} className="nav-link">
                Cerrar sesión
              </button>
             <button><a className="dropdown-item" style={{cursor:"pointer"}}>{username} Nombre del usuario</a></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Outlet para renderizar rutas secundarias */}
      <Outlet />
    </div>
  );
};

export default Menu;
