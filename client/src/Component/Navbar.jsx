import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../Assets/img/logoDumbFlix.svg"
import { Button, Modal, Form } from "react-bootstrap";
import Login from "./Modal/Modal-Login";
import Register from "./Modal/Modal-Register"

export default function TopNav(props) {
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow (true)

    const [register, setRegister] = useState(false)
    const handleCloseRegister = () => setRegister(false)
    const handleShowRegister = () => setRegister(true)


    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Tv Shows</Nav.Link>
            <Nav.Link href="#pricing">Movies</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home"><img src={Logo} alt="logo" /></Navbar.Brand>
          <Nav className="justify-content-end">
            <Button variant="light" style={{color:"red", marginRight:"20px"}} onClick={handleShow}>Login</Button>
            <Button variant="danger" onClick={handleShowRegister}>Register</Button>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Body style={{backgroundColor:"#1F1F1F", width:"450px", borderRadius:"8px", textAlign:"center"}}>
            <Login />
            <Form.Text style={{color:"white"}}>Dont have an account?<b style={{cursor:"pointer"}} onClick={() => {
          handleShowRegister();
          handleClose();
        }}> Click here to register</b></Form.Text>
        </Modal.Body>
      </Modal>

      <Modal show={register} onHide={handleCloseRegister} {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Body style={{backgroundColor:"#1F1F1F", width:"450px", borderRadius:"8px", textAlign:"center"}} >
        <Register />
        <Form.Text style={{color:"white"}}>Already have an account? <b style={{cursor:"pointer"}} onClick={() => {
          handleShow();
          handleCloseRegister();
        }}>Click here to login</b></Form.Text>
        </Modal.Body>
      </Modal>
      </>
    )
}