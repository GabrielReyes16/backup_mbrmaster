import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stock = () => {
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
              <Link to="/menu/almacen" className="nav-link">
                Almacen
              </Link>
              {/* Use a button instead of an anchor for a disabled link */}
              <button className="nav-link disabled" aria-disabled="true">
                Stock
              </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Formulario de Reporte</h1>
              <form action="#">
                <div className="mb-3">
                  <label for="codigoProducto" className="form-label">Código del Producto</label>
                  <input type="text" class="form-control" id="codigoProducto" placeholder="Ingrese el código del producto"></input>
                </div>
                <div className="mb-3">
                  <label for="descripcion" className="form-label">Descripción</label>
                  <textarea class="form-control" id="descripcion" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div className="col-md-6 text-center">
                <br></br>
                <button type="submit" className="btn btn-primary mt-4">Generar Reporte</button>
                <br></br><br></br><br></br>
                <button type="submit" className="btn btn-success mt-4">Exportar a Excel</button>
            </div>
          </div>
        </div>
        <div class="container">
    <h1 class="text-center">Reporte General</h1>
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Código Interno</th>
            <th scope="col">Código del Producto</th>
            <th scope="col">Familia</th>
            <th scope="col">SubFamilia</th>
            <th scope="col">Tipo</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Nombre del Producto</th>
            <th scope="col">Descripción</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">12456</th>
            <td>12345</td>
            <td>Tecnología</td>
            <td>Computadoras</td>
            <td>Portátil</td>
            <td>Lenovo</td>
            <td>ThinkPad</td>
            <td>ThinkPad X1 Carbon</td>
            <td>Computadora portátil ultraligera y potente</td>
            <td>10</td>
          </tr>
          <tr>
            <th scope="row">1654</th>
            <td>54321</td>
            <td>Hogar</td>
            <td>Cocina</td>
            <td>Electrodoméstico</td>
            <td>Oster</td>
            <td>Licuadora</td>
            <td>Licuadora Oster BLSTMB-CBG-000</td>
            <td>Licuadora de vaso de vidrio con 6 velocidades</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">167834</th>
            <td>98765</td>
            <td>Deportes</td>
            <td>Bicicletas</td>
            <td>Montaña</td>
            <td>Specialized</td>
            <td>Rockhopper</td>
            <td>Bicicleta de montaña Specialized Rockhopper Comp 29</td>
            <td>Bicicleta de montaña para principiantes y aficionados</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
        <Outlet />
      </div>
  );
};
  
export default Stock;
