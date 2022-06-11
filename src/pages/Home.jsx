import React from 'react';
import { useEffect } from 'react';
import { filterCategory, filterTitle, getProducts } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row, ListGroupItem} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector(state => state.products)

    const [ search, setSearch ] = useState("")
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        dispatch(getProducts())

        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    /* console.log(categories); */

    const filterProducts = () => {
        dispatch(filterTitle(search))
        /* alert(`Search: ${search}`) */
    }

    const selectCategory = (id) => {
       /* alert(id) */
       dispatch(filterCategory(id))
    }

    return (
        <div>
            {/* <h1>Home</h1> */}

                <Row>
                    <Col>
                        <ListGroup horizontal className='mb-2'>
                        {
                            categories.map(category => (
                                <ListGroupItem 
                                    key={category.id} 
                                    onClick={() => selectCategory(category.id)} 
                                    style={{cursor:"pointer"}}
                                >
                                    {category.name}
                                </ListGroupItem>
                            ))
                        }
                        </ListGroup>
                    </Col>
                </Row>


{/* filtro por categoria */}
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Search product..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={e => setSearch(e.target.value)}
                    value={search}/>
                    <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts}>
                        Search
                    </Button>
                </InputGroup>



                <Row xs={1} md={2} lg={3} className="g-4">
            {
                products.map(product => (
                    <Col key={product.id}>
                        <Card 
                        onClick={() => navigate(`/products/${product.id}/`)} 
                        key={product.id}
                        style={{cursor:"pointer"}}>
                            <Card.Img variant="top" src={product.productImgs[0]} className="img-fluid2"/>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>$ {product.price}</Card.Footer>
                            {/* {product.title} */}
                            {/* <img src={product.productImgs[2]} alt=""  style={{width:"400px", height:"500px"}}  /> */}
                        </Card>
                    </Col>
                ))
            }
                </Row>
        </div>
    );
};

export default Home;