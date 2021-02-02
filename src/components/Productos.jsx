import React from 'react'
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from  "react-bootstrap/Container";
import Row from  "react-bootstrap/Row";
import Col from  "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";


const Producto = ({producto,eliminarProducto}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("Transitioning...");
  
    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
      setTitle("Transitioning...");
    };
  
    const modalLoaded = () => {
      setTitle("Advertencia");
    };

 return(  
    <div >
        {/* <p>Producto: <span>{producto.nombreProducto}</span></p>
        <p>Fecha: <span>{producto.fecha}</span></p>
        <p>Imagen: <span><img src={producto.imagen}  alt=''width="100" height="100"></img></span></p>
        <p>Descripcion: <span>{producto.descripcion}</span></p>

       */}

   

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={producto.imagen}/>
  <Card.Body>
    <Card.Title>{producto.nombreProducto}</Card.Title>
    <Card.Text>
    {producto.descripcion}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>{producto.fecha}</ListGroupItem>
  </ListGroup>

  <Card.Body>
    <Card.Link href="#"> <button onClick={showModal}>Eliminar</button>
        <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <button
        className="button eliminar u-full-width"
        onClick={ () => eliminarProducto(producto.id)}
        >Eliminar &times;
        </button>   
        <button className="button cancelar u-full-width" onClick={hideModal}>Cancelar</button>  
        </Modal.Footer>
      </Modal>

      </Card.Link>
  </Card.Body>
</Card>
<Container>
  <Row>
    <Col>1 of 1</Col>
  </Row>
</Container>
    </div>
    
)};

Producto.propTypes={
    producto:PropTypes.object.isRequired,
    eliminarproducto:PropTypes.func.isRequired
}
export default Producto;