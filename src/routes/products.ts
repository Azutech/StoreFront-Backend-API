import {Router} from 'express'
import Product from '../controllers/products'
import verifyToken from '../middleware/auth'

const product = Router()


product.get('/coffees',  Product.getProductsall)
product.get('/coffees/:id', verifyToken, Product.getProductById)
product.post('/coffees', verifyToken, Product.createProduct)
product.patch('/coffees/:id', Product.updateProduct)
product.delete('/coffees/:id', verifyToken, Product.destroyProduct)




export default product