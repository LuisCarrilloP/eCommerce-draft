import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';
import { filterCategory, filterTitle } from '../store/slices/products.slice';


const ProductDetails = () => {

    const [ products, setProducts ] = useState({})
    const [ productqty, setProductqty ] = useState("")

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productsList = useSelector(state => state.products)

    useEffect(() => {
        axios
            .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then((res) => {
                const productSearch = res.data.data.products?.find(productItem => productItem.id === Number(id))

        /* console.log(res.data.data.products); */
                setProducts(productSearch)
                dispatch(filterCategory(productSearch?.category.id))
            })
    },[dispatch, id])

    /* console.log(products); */

    const addProduct = () => {
        const product = {
            id: id,
            quantity: productqty
        }
        dispatch(addToCart(product))
        /* console.log(product) */
    }
    return (
        <div>
            <h1>Detail</h1>
            <h2>{products.title}</h2>

           <div className="block">
            <input 
                    type="number" 
                    min="1"
                    max="5"
                    onChange={e => setProductqty(e.target.value)} 
                    value={productqty}
                />
                <Button onClick={() => addProduct()}>Add to cart</Button>
           </div>

            <img src={products.productImgs?.[0]} alt="" className='img-detail' />
            <img src={products.productImgs?.[1]} alt="" className='img-detail2' />
           
            <div className="relatedProducts">
                {
                    productsList.map(productItem => (
                        <li 
                            key={productItem.id} 
                            onClick={() => navigate(`/products/${productItem.id}`)}
                            style={{cursor: "pointer"}}>
                           {/* <Link to={`/products/${productItem.id}`}> */}
                               {productItem.title}
                            {/* </Link>  */}
                            {/* <img src={productItem.productImgs[0]} alt="" /> */}
                        </li>
                    ))
                }
            </div>
           
        </div>
    );
};

export default ProductDetails;