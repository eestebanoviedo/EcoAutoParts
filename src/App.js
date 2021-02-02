import React, { Fragment, useState, useEffect } from 'react';
import FormularioDeCarga from './components/FormularioDeCarga.jsx'
import Producto from './components/Productos.jsx'
import { BrowserRouter as Router, NavLink } from "react-router-dom"
import Route from 'react-router-dom/Route'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let productosIniciales = JSON.parse(localStorage.getItem('productos'))
  if (!productosIniciales) {
    productosIniciales = []
  }

  const [productos, guardarProductos] = useState(productosIniciales)

  useEffect(() => {
    if (productosIniciales) {
      localStorage.setItem('productos', JSON.stringify(productos))
    } else {
      localStorage.setItem('productos', JSON.stringify([]))
    }
  }, [productos, productosIniciales])

  const crearProducto = producto => {
    guardarProductos([...productos, producto])
  }

  const eliminarProducto = id => {
    const nuevasProductos = productos.filter(producto => producto.id !== id)
    guardarProductos(nuevasProductos)
  }


  const titulo = productos.length === 0 ? 'No hay productos' : 'Productos'

  return (
    <Router>
      <Fragment>
        <div className="navBar" id="mainNavBar">
          <NavLink className="nav" to="/formulario">Formulario de Carga de Productos</NavLink>
          <NavLink className="nav" to="/productos/">Ver Productos</NavLink>
        </div>

        <Route path='/' exact strict render={
          () => {
            return (
              <h1>Elija si desea cargar un producto o visualizarlos con los botones de arriba</h1>
            )
          }
        } />

        <Route path='/formulario' exact strict render={
          () => {
            return (
              <div className="container">
                <div className="row">
                  <div className="column">
                    <FormularioDeCarga
                      crearProducto={crearProducto}
                    />
                  </div>
                </div>
              </div>)
          }
        } />

        <Route path='/productos/' exact strict render={
          () => {
            return (
              <div className="container">
                <div className="row">
                  <div className="column">
                    <h2>{titulo}</h2>
                    {productos.map(producto => (
                      <Producto
                        key={producto.id}
                        producto={producto}
                        eliminarProducto={eliminarProducto}
                      />
                    ))}
                  </div>

                </div>
              </div>
            )
          }
        } />
      </Fragment>
    </Router>
  );
}

export default App;
