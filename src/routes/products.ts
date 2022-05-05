import {Router} from 'express'
import Product from '../controllers/products'
import verifyToken from '../middleware/auth'

const productRouter = Router()


productRouter.get('/coffees',  Product.getProductsall)
productRouter.get('/coffees/:id', verifyToken, Product.getProductById)
productRouter.post('/coffees', verifyToken, Product.createProduct)
productRouter.patch('/coffees/:id', Product.updateProduct)
productRouter.delete('/coffees/:id', verifyToken, Product.destroyProduct)




export default productRouter