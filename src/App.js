import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario.jsx'
import Cita from './components/Cita.jsx'
import { BrowserRouter as Router, NavLink } from "react-router-dom"
import Route from 'react-router-dom/Route'

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
          <NavLink className="nav" to="/">Formulario</NavLink>
          <NavLink className="nav" to="/productos/">Producto</NavLink>
        </div>

        <Route path='/' exact strict render={
          () => {
            return (
              <div className="container">
                <div className="row">
                  <div className="column">
                    <Formulario
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
                      <Cita
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
