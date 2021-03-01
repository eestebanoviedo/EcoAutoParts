import React, { useState } from "react";
import PropTypes from "prop-types";
// paso 1 importamos los modales
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const Producto = ({ producto, eliminarProducto, productos, crearProducto }) => {
  const [data, setData] = useState(productos); //2 a nuestro const data le asingamos le valor productos
  const [modalEditar, setModalEditar] = useState(false); // 6Control de cuando se abre y cuando se cierra modal
  const [modalEliminar, setModalEliminar] = useState(false); //6 Control de cuando se abre y cuando se cierra modal
  //7 estado para controlar que pais esta seleccinado
  const [productoSeleccionado, setProductoSeleccinado] = useState({
    nombreProducto: "",
    fecha: new Date().toLocaleDateString(),
    descripcion: "",
    imagen: "",
  });

  //8 controlar que producto esta seleccinado y ver si editarlo o eliminarlo(caso sirve para saber si se trata de editar o eliminar varia para saber que modal se tiene que abrir)
  const seleccionarProducto = (elemento, caso) => {
    setProductoSeleccinado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  //11 captura lo que el usuario esta escribiendo el usuario en cada uno de los inputs
  const handleChange = (e) => {
    //11 asigna al state lo que el usuario esta escribiendo en base al NAME del INPUT
    const { name, value } = e.target;
    setProductoSeleccinado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log(productoSeleccionado)

  const editar = () => {
    //12 asigna toda la data para poderla modificar
    /*
    1. guardar id objeto
    2. crear nuevo objeto con los nuevos datos sin el id
    3. agregarle el id guardado 
    4. Buscar en la lista de productos el objeto anterior y borrarlo
    5. Agregar objeto actualizado
    */
    var dataNueva = data;
    dataNueva.map((producto) => {
      if (producto.id === productoSeleccionado.id) {
        producto.nombreProducto = productoSeleccionado.nombreProducto;
        producto.descripcion = productoSeleccionado.descripcion;
      }
      console.log(producto);
    });
    // console.log(producto);
    crearProducto(dataNueva);
    setModalEditar(false);
  };

  //3 creamos tabla para mostrarle al usuario los productos
  //4 recorremos el array de prodctos con la funcion map que esta en App.js
  return (
    <div className="producto">
      <table className="table table-boardered">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre Producto</th>
            <th>Fecha</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {" "}
              <img src={producto.imagen} alt="" width="150px" />
            </th>
            <th className="stilo2">{producto.nombreProducto}</th>
            <th>{producto.fecha}</th>
            <th className="stilo2">{producto.descripcion}</th>
            <td>
              {/* //5 creamos dos botones uno para eliminar y el otro para editar */}
              {/* //9 llamamos la funcion seleccionarProducto en el boton editar*/}
              <button
                className="btn btn-primary"
                onClick={() => seleccionarProducto(producto, "Editar")}
              >
                Editar
              </button>
              {"   "}
              <button
                className="btn btn-danger"
                onClick={() => seleccionarProducto(producto, "Eliminar")}
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* //Modal permanece cerrado hasta que se lo indiquemos */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="form-group">
            <label>Nombre Producto</label>

            {/* <input
              className="form-control"
              type="file"
              accept="image/*"
              name="imagen"
              onChange={handleChange}
              value={producto.imagen && productoSeleccionado.imagen}
            /> */}
            <input
              className="form-control"
              type="text"
              name="nombreProducto"
              //10 asignamos valor a los inputs de acuedo al producto seleccionado
              value={
                producto.nombreProducto && productoSeleccionado.nombreProducto
              }
              onChange={handleChange}
            />
            <br />

            <label>Fecha</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="fecha"
              value={producto.fecha && productoSeleccionado.fecha}
              onChange={handleChange}
            />
            <br />

            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={producto.descripcion && productoSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        {/* ---------------------MODAL EDITAR-------------------------- */}
        <Modal isOpen={modalEliminar}></Modal>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            {" "}
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            {" "}
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      {/* ---------------------MODAL ELIMINAR-------------------------- */}
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto{" "}
          {productoSeleccionado && productoSeleccionado.nombreProducto}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => eliminarProducto(producto.id)}
          >
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Producto.propTypes = {
  producto: PropTypes.object.isRequired,
  eliminarproducto: PropTypes.func.isRequired,
};
export default Producto;
