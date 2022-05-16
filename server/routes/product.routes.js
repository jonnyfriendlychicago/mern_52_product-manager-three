// ! findReplace all "Product" with "YourNewProName" or whatever your new thing is 
// ! THEN do similar find replace for "product" Make sure lower case

const ProductController = require("../controllers/product.controller"); 

module.exports = (app) => {
    app.get('/', ProductController.homePageDelivery); 
    app.get("/api/products", ProductController.getProducts); 
    app.post("/api/products",ProductController.createProduct); 
    app.get("/api/products/:id", ProductController.getProductById); 
    app.put("/api/products/:id", ProductController.updateProduct); 
    app.delete("/api/products/:id", ProductController.deleteProduct); 
};

