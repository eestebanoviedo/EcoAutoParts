import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App(){
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}


  {/* <Card style={{display: 'flex', flexDirection: 'row'}}className="card-style">
        <Card.Img  src={producto.imagen}alt="Card image cap" />
        <Card.Body>
          <Card.Title >{producto.nombreProducto}</Card.Title>
          <Card.Subtitle>Fecha de ingreso: {producto.fecha}</Card.Subtitle>
          <Card.Text className="stilo">descripcion: {producto.descripcion}</Card.Text>
        </Card.Body> */}

