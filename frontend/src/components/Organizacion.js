import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Organizacion = () => {
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
              <button className="nav-link" disabled>
                Organizacion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Contenedor de tarjetas */}
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/VEt2pu90cJcuVOwj0Ztj/VEt2pu90cJcuVOwj0Ztj--1--whk00.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/nueva_area" className="btn btn-primary">
                  Nueva Area
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/6jkQ38sOb21mVzfpbsvM/6jkQ38sOb21mVzfpbsvM--1--0q4ey.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/nueva_sub_area" className="btn btn-primary">
                  Nueva SubArea
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/OJPcBpr02tOy2ZfHhnWh/OJPcBpr02tOy2ZfHhnWh--1--zjauf.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/nueva_unidad" className="btn btn-primary">
                  Nueva Unidad
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/GgQcVgrXKztnL4OFb3Ne/GgQcVgrXKztnL4OFb3Ne--1--ovjpg.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/consultar3" className="btn btn-primary">
                  Consultas areas
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/aI9NE1Rb65V0tu6vn9Xe/aI9NE1Rb65V0tu6vn9Xe--1--23dzs.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/consultar2" className="btn btn-primary">
                  Consultas subarea
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img src="https://images.nightcafe.studio/jobs/FFNS0pcoDyawN23fyYQK/FFNS0pcoDyawN23fyYQK--1--19una.jpg?tr=w-1600,c-at_max" className="card-img-top" alt="..." />
              <div className="card-body">
                <Link to="/menu/maestro/organizacion/consultar" className="btn btn-primary">
                  Consulta General
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Organizacion;
