import products from "./routes/products doc"


const swaggerDocumentations = {
openapi: '3.0.0',
info: {
    title: "StoreFront Apis",
    version: '2.0.0'
},
servers: [
    {
        url:'http://localhost:3000',
        description: "local server"
    }
],

paths: {

...products
 },
}
export default swaggerDocumentations