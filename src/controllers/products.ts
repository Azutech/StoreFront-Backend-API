import express, {Request, Response} from "express"
import Product from "../interfaces/products"
import { CoffeeStore } from "../model/products"


const store = new CoffeeStore()



const getProductsall = async  (req: express.Request, res: express.Response) => {
    
    try {
        const products = await store.getProductsall()
        // if (products.length <1) responeUtil(res, 200, null, "No products found", "Success" )
        res.status(200).json({
            status:'Success',
            message: "All products were found successfully",
            data: products
        })
    } catch (error) {
      res.status(500)
      res.json(error)
    }
}






const createProduct = async   (req: Request, res: Response) =>  {
    console.log('abeg work')
    try {
        
        
        const coffee: Product = {
               
                name: req.body.name,
                price: req.body.price,
                type:  req.body.type,
                origin: req.body.origin

        }
        console.log(coffee)
        const product = await store.create(coffee)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(404)
        res.json({message: `can't create product`})
    }
}
const updateProduct = async   (req: Request, res: Response) => {
    try {
        if(!req.body.name) {
            return res.status(400).json({
                error: 'Fill in the right Product'
            })
        }
        
        const coffee: Product = {
           
            name: req.body.name,
            price: req.body.price,
            type:  req.body.type,
            origin: req.body.origin
        }

        const product = await store.updateProduct(coffee, req.params.id )
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(404)
        res.json(error)
    }
}
const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await store.getProductsById(parseInt(req.params.id))
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const destroyProduct= async (req: Request, res: Response) => {
    try {
        await store.destroyProduct(parseInt(req.params.id as string))
        res.status(200).json({ status: `Deleted product ${req.params.id}` })
    } catch (e) {
        res.status(500).json(e)
    }
}

export default {getProductsall, getProductById, createProduct, updateProduct, destroyProduct}

// const product_stores = (app: express.Application) => {
// app.get('/coffees',  getProductsall)
// app.get('/coffees/:id', verifyToken, getProductById)
// app.post('/coffees', verifyToken, createProduct)
// app.patch('/coffees/:id', updateProduct)
// app.delete('/coffees/:id', verifyToken, destroyProduct)
// }

// export default product_stores