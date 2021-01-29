import React from 'react'
import PropTypes from 'prop-types';

const Producto = ({producto,eliminarProducto}) =>  (  
    <div className="producto">
        <p>Producto: <span>{producto.nombreProducto}</span></p>
        <p>Fecha: <span>{producto.fecha}</span></p>
        <p>Imagen: <span><img src={producto.imagen}  alt=''width="100" height="100"></img></span></p>
        <p>Descripcion: <span>{producto.descripcion}</span></p>

        <button
        className="button eliminar u-full-width"
        onClick={ () => eliminarProducto(producto.id)}
        >Eliminar &times;
        </button>
    </div>
);

Producto.propTypes={
    producto:PropTypes.object.isRequired,
    eliminarproducto:PropTypes.func.isRequired
}
export default Producto;