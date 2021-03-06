// ! findReplace all "Product" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "product" Make sure lower case
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Container, Row, Card, Form} from 'react-bootstrap'; 

const ProductUpdateCmp = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [title, titleSetter ] = useState("");
    const [price, priceSetter] = useState("");
    const [description, descriptionSetter] = useState("");
    
    const navigate = useNavigate();
    // retrieve the current values for this person so we can fill
    // in the form with what is in the db currently
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/products/' + id)
            .then(res => {
                titleSetter(res.data.title);
                priceSetter(res.data.price);
                descriptionSetter(res.data.description);
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:8000/api/products/' + id, {
                title // this is shortcut syntax for firstName: firstName,
            , price     
            , description
            })
            .then(res => {
                console.log(res);
                navigate("/"); // this will take us back to the Main.js
            })
            .catch(err => console.log(err))
    }
    return (
            <Container>
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <h2>Update Product</h2>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>title:</Form.Label>
                            <Form.Control
                                style = {{width: '300px', height: "25px"}}
                                type = "textarea"
                                value={title}
                                // placeholder={title}
                                onChange ={(e) => titleSetter(e.target.value)}
                            /> 
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_02">
                            <Form.Label>price:</Form.Label>
                            <Form.Control
                                style = {{width: '300px', height: "25px"}}
                                type = "textarea"
                                value={price}
                                onChange ={(e) => priceSetter(e.target.value)}
                            /> 
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_03">
                            <Form.Label>description:</Form.Label>
                            <Form.Control
                                style = {{width: '300px', height: "25px"}}
                                type = "textarea"
                                value={description}
                                onChange ={(e) => descriptionSetter(e.target.value)}
                            /> 
                        </Form.Group>

                        {/* below is fine, but not updated yet wed 5/11 */}

                        {/* <Form.Group className="mb-3 bg-white" controlId="FormGroup_02">
                            <Form.Label>Work Area:</Form.Label>
                            <Form.Select 
                                    style = {{width: '300px', height: '35px'}} 
                                    aria-label="Default select example"
                                    onChange={ workAreaHandle }  >
                                    <option selected></option>
                                    <option value="diet">Diet</option>
                                    <option value="fitWell">Fitness/Wellness</option>
                                    <option value="homeMaintenance">Home Maintenance</option>
                                    <option value="work">Work</option>
                                    <option value="kids">Kids</option>
                                    <option value="contEd">Cont'd Ed/Skills</option>
                                    <option value="social">Social</option>
                                    <option value="yourTime">Your Thing</option>
                            </Form.Select>
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="ToDo03">
                            <Form.Control style = {{width: "100px"}} className="btn btn-primary" type = "submit" value="Submit it!"/>
                        </Form.Group>
                    </Form> 
                </Card>
            </Row>
        </Container> 
    )
}
export default ProductUpdateCmp;