// ! findReplace all "Product" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "product" Make sure lower case
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";// added
import {Container, Row, Card, Button} from 'react-bootstrap'; 

const ProductDetailCmp = (props) => {

    const [product, productSetter] = useState({})
    const {id} = useParams(); 

    const navigate = useNavigate(); // added

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/products/" + id)
            .then( res => {
                console.log(res.data);
                productSetter(res.data);
            })
            .catch( err => console.log(err) )
    }, [])

    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/products/' + id)
            .then(res => {
                navigate("/"); 
            })
            .catch(err => console.log(err))
    }

    return (
        <Container> 
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <p>title: {product.title}</p>
                    <p>price: {product.price}</p>
                    <p>description: {product.description}</p>
                    {/* <p> Additional fields to be added here.</p> */}
                    <Button onClick={(e)=>{handleDelete(product._id)}}>Delete</Button> 
                    {/* added line above */}
                </Card>
            </Row>
        </Container> 
    )
}
export default ProductDetailCmp;