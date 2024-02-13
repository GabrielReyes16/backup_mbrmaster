import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Recursos_Humanos = () => {
 
    
  
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
                Recursos Humanos
              </button>
              </div>
            </div>
          </div>
        </nav>
      <hr />
      <div className="row">
      <label>Páis *</label>
  <select name="cbo-country" id="cbo-country">
    <option value="">Seleccione</option>

  </select>
</div>
<div>
  <label>Departamento/Estado *</label>
  <select name="cbo-state" id="cbo-state" >
    <option value="">Seleccione</option>

  </select>
</div>
<div class="container-city" >
  <label>Ciudad</label>
  <select name="cbo-city" id="cbo-city">
    <option value="">Seleccione</option>

  </select>
</div>
<div class="container-province" >
  <label>Provincia</label>
  <select name="cbo-province" id="cbo-province">
    <option value="">Seleccione</option>
  
  </select>
</div>
<div class="container-district" >
  <label>Distrito</label>
  <select name="cbo-district" id="cbo-district">
    <option value="">Seleccione</option>
 
  </select>
  
      </div>
      <Outlet />
    </div>
  );
};
  
export default Recursos_Humanos;
