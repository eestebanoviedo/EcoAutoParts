import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'


const Producto = ({producto,eliminarProducto,productos}) => {
    const [data, setData] = useState(productos);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [productoSeleccionado,setProductoSeleccinado]=useState  ({
      nombreProducto:'',
      fecha:new Date().toLocaleDateString(),
      descripcion:'',
      imagen:''
    })


    const seleccionarProducto=(elemento, caso)=>{
      setProductoSeleccinado(elemento);
      (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
    }

    const handleChange=e=>{
      const {name, value}=e.target;
      setProductoSeleccinado((prevState)=>({
        ...prevState,
        [name]: value
      }));
    }

    // console.log(productoSeleccionado)

    const editar=()=>{
      var dataNueva=data;
      dataNueva.map(asd=>{
        if(asd.id===productoSeleccionado.id){
          asd.nombreProducto=productoSeleccionado.nombreProducto;
          asd.descripcion=productoSeleccionado.descripcion;
        }
      });
      setData(dataNueva);
      setModalEditar(false);
    }


    

 return(  
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
        <img src={producto.imagen} width="150px"/>
          <th>{producto.nombreProducto}</th>
          <th>{producto.fecha}</th>
          <th>{producto.descripcion}</th>
          <td><button className="btn btn-primary" onClick={()=>seleccionarProducto(producto,"Editar")}>Editar</button>{'   '}
          <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto,"Eliminar")}>Eliminar</button>
          </td>
        </tr>
        </tbody>
      </table>

      <Modal isOpen={modalEditar} >

        <ModalHeader>
          <div>
            <h3>Editar País</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="form-group">
            <label>Nombre Producto</label>
            <input
              className="form-control"
              
              type="text"
              name="nombreProducto"
              value={producto.nombreProducto && productoSeleccionado.nombreProducto}
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
          <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()} > Actualizar</button>
          <button className="btn btn-danger" onClick={()=>setModalEditar(false)}> Cancelar</button>
        </ModalFooter>
      </Modal>
       

        <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombreProducto}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={ () => eliminarProducto(producto.id)}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}>
            No
          </button>
        </ModalFooter>
      </Modal>
</div>
    
)};

Producto.propTypes={
    producto:PropTypes.object.isRequired,
    eliminarproducto:PropTypes.func.isRequired
}
export default Producto;