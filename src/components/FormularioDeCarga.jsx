import React,{Fragment,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';


const FormularioDeCarga = ({crearProducto}) => {
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

    const notify = () =>toast.success('Producto Guardado!', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;


    return (
        <Fragment>
            <h2>Crear Producto</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : <ToastContainer
                                                                                     position="top-right"
                                                                                     autoClose={3500}
                                                                                     hideProgressBar={false}
                                                                                     newestOnTop={false}
                                                                                     closeOnClick
                                                                                     rtl={false}
                                                                                     pauseOnFocusLoss
                                                                                     draggable
                                                                                     pauseOnHover
                                                                                     />
            }

            <form onSubmit={submitProducto}>   
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
					 <img src={picture } id="img" className="img" alt=''></img>
				</div>
                
                <input type="file" 
                        accept="image/*"
                        className="u-full-width"
                        name="imagen"
                        key={Date.now()}
                        onChange={onChangePicture} 
                        id="input"/>
                        
                 <div className="label">
                    <label className="imagen" htmlFor="input">
						<i className="material-icons">add_photo_alternate</i>
						Elija la imagen del producto 
					</label>
          </div>
			
                <button
                type="submit"
                className="u-full-width button-primary"
                onClick={notify}>Agregar Producto</button>
        
            </form>

            
        </Fragment>
    );
}

FormularioDeCarga.propTypes={
    crearProducto:PropTypes.func.isRequired
}

export default FormularioDeCarga;


