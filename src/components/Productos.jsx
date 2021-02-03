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
    <div className="producto">
 
<Card style={{width: '18rem' }}>
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

  {/* <Card style={{display: 'flex', flexDirection: 'row'}}className="card-style">
        <Card.Img  src={producto.imagen}alt="Card image cap" />
        <Card.Body>
          <Card.Title >{producto.nombreProducto}</Card.Title>
          <Card.Subtitle>Fecha de ingreso: {producto.fecha}</Card.Subtitle>
          <Card.Text className="stilo">descripcion: {producto.descripcion}</Card.Text>
        </Card.Body> */}


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

{/* <Container>
  <Row>
    <Col>1 of 1</Col>
    <Col>1 of 1</Col>
    <Col>1 of 1</Col>
    <Col>1 of 1</Col>
  </Row>
</Container> */}
    </div>
    
)};

Producto.propTypes={
    producto:PropTypes.object.isRequired,
    eliminarproducto:PropTypes.func.isRequired
}
export default Producto;