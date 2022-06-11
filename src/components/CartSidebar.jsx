import React from 'react';
import { ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({show, handleClose}) => {
    
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectProduct = (purchase) => {
        handleClose()
        navigate(`/products/${purchase.id}`)
    }

   

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your wishes</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {
                            cart.map(cartItem => (
                                <ListGroupItem 
                                    key={cartItem.id} 
                                    onClick={() => selectProduct(cartItem) }
                                    style={{cursor:"pointer"}}
                                >
                                    <h5>{cartItem.title}</h5>
                                    <p><b>Price:</b> $ {cartItem.price}</p>
                                    <p><b>Quantity:</b> {cartItem.productsInCart.quantity}</p>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                    
                    {/* <p><b>Total:</b>$</p> */}
                    <button onClick={() => dispatch(buyCartThunk())}>Buy</button>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSidebar;