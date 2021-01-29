import React,{Fragment,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearProducto}) => {
    const[producto,actualizarProducto] = useState({
        nombreProducto:'',
        fecha:new Date().toLocaleDateString(),
        descripcion:'',
        imagen:''
    })

    console.log(producto)

    const [picture, setPicture] = useState(null);
  
    const onChangePicture = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setPicture(reader.result);
            console.log(reader.result)
            actualizarProducto({
                ...producto,
                imagen :reader.result
            })
        };
        reader.readAsDataURL(file);
        console.log(producto)
      };

    const [error,actualizarError] =useState(false)
    
    const actualizarState= e =>{

        actualizarProducto ({
            ...producto,
            [e.target.name] :e.target.value
        })
    }

    const{ nombreProducto,fecha,descripcion,imagen} = producto


    const submitProducto =(e) =>{
        e.preventDefault()

        if(nombreProducto.trim() === '' || descripcion.trim() === ''  || imagen === ''){
            actualizarError(true )
            return
        }

        actualizarError(false)
        
        producto.id =uuidv4()

        crearProducto(producto)

        actualizarProducto({
            nombreProducto:'',
            fecha:new Date().toLocaleDateString(),
            descripcion:'',
            imagen:''
    })
    }


    return (
        <Fragment>
            <h2>Crear Producto</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
            onSubmit={submitProducto}
            >   
                <label>Nombre Producto</label>
                <input 
                type="text"
                name="nombreProducto"
                className="u-full-width"
                placeholder="Nombre producto"
                onChange={actualizarState}
                value={nombreProducto}
                />

            <label>Fecha </label>
                <input 
                type="text" 
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                disabled
                />

            <label>Descripcion</label>
               <textarea
                    className="u-full-width"
                    name="descripcion"
                    onChange={actualizarState}
                    value={descripcion}
               ></textarea>

         
            <label>Agregar imagen</label>
				<div>
					 <img src={picture }  alt=''width="100" height="100"></img>
				</div>
                
                <input type="file" 
                        accept="image/*"
                        className="u-full-width"
                        name="imagen"
                        key={Date.now()}
                        onChange={onChangePicture} />
                
                <button
                type="submit"
                className="u-full-width button-primary"
            >Agregar Producto</button>

            </form>

            
        </Fragment>
    );
}

Formulario.propTypes={
    crearProducto:PropTypes.func.isRequired
}

export default Formulario;


