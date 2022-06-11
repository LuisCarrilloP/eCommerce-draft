import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import CartSidebar from './CartSidebar';

const NavBar = () => {

    const logout = () => localStorage.setItem("token", "")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")
        if(token){
            setShow(true)
        }else{
            navigate("/login")
        }     
    }

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/#/login">Login</Nav.Link>
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            <Nav.Link role="button" onClick={handleShow}>Cart</Nav.Link>
                            <Nav.Link role="button" onClick={logout}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           
           <CartSidebar show={show} handleClose={handleClose}/> 
        </div>
    );
};

export default NavBar;