// ! findReplace all "Product" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "product" Make sure lower case
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import {Container, Row, Card, Button} from 'react-bootstrap'; 

const ProductListCmp = (props) => {
    
    // const {productList, productListSetter} = props;
    const {removeFromDom, productList, productListSetter} = props;
    
    useEffect(()=>{
    	axios
            .get("http://localhost:8000/api/products")
            .then((res)=>{
                console.log(res.data);
                productListSetter(res.data);
            })
            .catch((err)=>{console.log(err)})
    }, [])
    
    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/products/' + id)
            .then(res => {
                removeFromDom(id)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <Container> 
            <Row>
                <h2>Products</h2>
                {
                    productList.map((product, index)=>{
                    return (
                        <Card key={index} style = {{width: '15rem', padding: '0.5rem', border: "0.1rem solid grey",  margin: "0.25rem"}} >
                            <p >{product.title}</p>
                            <p> {product.price}</p>
                            <p> {product.description}</p>
                            <p> Additional fields to be added here.</p>
                            <Link to={`/products/${product._id}`}>Details</Link>
                            <Link to={`/products/edit/${product._id}`}>Edit</Link>
                            <Button onClick={(e)=>{handleDelete(product._id)}}>Delete</Button>
                        </Card>
                    )
                    })
                }
            </Row>
        </Container>
    )
}; 

export default ProductListCmp;
