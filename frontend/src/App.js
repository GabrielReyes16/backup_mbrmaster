import React from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal'; 
import Menu from './components/Menu';
import Maestro from './components/Maestro';
import Gastos from './components/Gastos';
import Ventas from './components/Ventas';
import Compras from './components/Compras';
import Almacen from './components/Almacen';
import Finanzas from './components/Finanzas';
import RecursosHumanos from './components/RecursosHumanos'; 
import Organizacion from './components/Organizacion';
import Consultas from './components/Consultas';
import NuevaUnidad from './components/NuevaUnidad';
import NuevaArea from './components/NuevaArea';
import NuevaSubArea from './components/NuevaSubArea';
import Consultas2 from './components/Consultas2';
import Consultas3 from './components/Consultas3';
import Login from './components/Login';
import Stock from './components/almacen/stock';
import ListaBancos from './components/ListaBancos';
import ListaClientes from './components/ListarClientes';
import ListarProveedores from './components/ListarProveedores';
import FormProveedor from './components/FormProveedor';
import FormCliente from './components/formCliente';
import FormBanco from './components/FormBanco';
Modal.setAppElement('#root');
function App() {
  return (
    <Router>
        <AuthProvider>
          <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                  isAuthenticated && <Login />
              )}
          </AuthContext.Consumer>
        <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/maestro" element={<Maestro />} />
        <Route path="/menu/gastos" element={<Gastos />} />
        <Route path="/menu/ventas" element={<Ventas />} />
        <Route path="/menu/compras" element={<Compras />} />
        <Route path="/menu/almacen" element={<Almacen />} />
        <Route path="/menu/finanzas" element={<Finanzas />} />
        <Route path="/menu/recursos_humanos" element={<RecursosHumanos />} />
        <Route path="/menu/maestro/organizacion" element={<Organizacion />} />
        <Route path="/menu/maestro/organizacion/consultar" element={<Consultas />} />
        <Route path="/menu/maestro/organizacion/consultar2" element={<Consultas2 />} />
        <Route path="/menu/maestro/organizacion/consultar3" element={<Consultas3 />} />
        <Route path="/menu/maestro/organizacion/nueva_unidad" element={<NuevaUnidad />} />
        <Route path="/menu/maestro/organizacion/nueva_area" element={<NuevaArea />} />
        <Route path="/menu/maestro/organizacion/nueva_sub_area" element={<NuevaSubArea />} />

        

        <Route path="/menu/bancos" element={<ListaBancos/>} />
        <Route path="/menu/banco/agregar" element={<FormBanco/>} />


        <Route path="/menu/clientes" element={<ListaClientes/>} />
        <Route path="/menu/cliente/agregar" element={<FormCliente/>} />

        <Route path="/menu/proveedores" element={<ListarProveedores/>} />
        <Route path="/menu/proveedor/agregar" element={<FormProveedor/>} />



        {/* rutas de almacen */}
        <Route path="/menu/almacen/stock" element={<Stock />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
