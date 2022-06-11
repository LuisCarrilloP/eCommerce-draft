import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPurchases())
    }, [])

    const getDate = purchaseDate => {
        const event = new Date(purchaseDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = event.toLocaleDateString('en-us', options);
        return date;  
    }

    return (
        <div>
            <h1>Purchases</h1>
            <ul className='list-group'>
                {
                    purchases.map(purchase => (
                        <>
                        <h3 key={purchase.createdAt}>{getDate(purchase.createdAt)}</h3>
                        <li  
                            key={purchase.id}
                            className="list-group-item">
                            {
                            purchase.cart.products.map(product =>(
                                <>
                                
                                    <p 
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        key={product.id}
                                    >
                                        {product.title}
                                        
                                    </p>
                                    <p key={product.title}>QTY: {product.productsInCart.quantity}</p>
                                </>
                                
                                
                            ))
                            }
                        </li>
                        </>
                    ))
                }
            </ul>
            
        </div>
    );
};

export default Purchases;