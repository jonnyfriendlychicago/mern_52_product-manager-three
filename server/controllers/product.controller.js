
// ! findReplace all "Product" with "YourNewProductityName" or whatever your new thing is 
// ! THEN do similar find replace for "product" Make sure lower case
const Product = require('../models/product.model'); 

const homePageDelivery =  (request, response) => {
// ! Update "Pistons" below to be any other sports team ("Angels?") which will verify the sever you see is this newly one you just created. 
    response.send("Hello, world.  May the Great Spirit smile upon us today.  Go Pistons.")
}; 

const createProduct = (request, response) => {
    console.log("createProduct: request.body:", request.body)
    Product.create(request.body)
    .then((newProduct) => {
        response.status(201).json(newProduct); 
    })
    .catch((err) => {
        response.status(500).json({message: "createProduct encountered an error", error: err}); 
    }); 
}; 

const getProducts = (request, response) => {
    Product.find({})
    .then((products) => {
        response.json(products); 
    })
    .catch((err) => {
        response.status(500).json({message: "getProducts encountered an error", error: err}); 
    }); 
}; 

const getProductById = (request, response) => {
    // Product.find({ "_id": request.params.id })
    // above-is-one-way-to-do-it , Mach recommends below instead.  but above is required if searching by another field.  
    Product.findById(request.params.id )
    .then((product) => {
        response.json(product); 
    })
    .catch((err) => {
        response.status(500).json({message: "getProductById encountered an error", error: err}); 
    }); 
}; 

const updateProduct = (request, response) => {
    Product.findByIdAndUpdate (request.params.id, request.body , {new: true} )
    .then((product) => {
        response.json(product); 
    })
    .catch((err) => {
        response.status(500).json({message: "updateProduct encountered an error", error: err}); 
    }); 
}; 

// module.exports.updatePerson = (request, response) => {
//     Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
//         .then(updatedPerson => response.json(updatedPerson))
//         .catch(err => response.json(err))
// }

const deleteProduct = (request, response) => {
    Product.findByIdAndDelete(request.params.id )
    .then((product) => {
        response.json(product); 
    })
    .catch((err) => {
        response.status(500).json({message: "deleteProduct encountered an error", error: err}); 
    }); 
}; 

module.exports = {
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    homePageDelivery
};