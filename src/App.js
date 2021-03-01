import React, { Fragment, useState, useEffect } from 'react';
import FormularioDeCarga from './components/FormularioDeCarga.jsx'
import Producto from './components/Productos.jsx'
import { BrowserRouter as Router } from "react-router-dom"
import Route from 'react-router-dom/Route'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/layout/Sidebar.jsx';
import ModalExample from './components/layout/modalAddProducto.jsx';


function App() {
  //Revisamos que local storage "productos" tenga algo
  let productosIniciales = JSON.parse(localStorage.getItem('productos'))
  //Si no hay productosInciales que cree un arreglo vacio y pasa a ser el array incial del useState de abajo
  if (!productosIniciales) {
    productosIniciales = []
  }

  const [productos, guardarProductos] = useState(productosIniciales)

  useEffect(() => {
    //Si hay productosInciales
    if (productosIniciales) {
      //Si hay produtos iniciales las colocamos dentro el local storage
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

  const editarProducto = id => {
    const nuevasProductos = productos.filter(producto => producto.id !== id)
  }

  const titulo = productos.length === 0 ? <ModalExample /> : 'Productos'

  return (
    <Router>
      <Fragment>
        <div className="contenedor-app">
          <Sidebar />

          <div className="seccion-principal">
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
                            productos={productos}
                            eliminarProducto={eliminarProducto}
                            crearProducto={crearProducto}
                          />
                        ))}
                      </div>

                    </div>
                  </div>
                )
              }
            } />
          </div>
        </div>

      </Fragment>
    </Router>
  );
}

export default App;
