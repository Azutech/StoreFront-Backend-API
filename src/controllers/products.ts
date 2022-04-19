import express, {Request, Response} from "express"
import Product from "../interfaces/products"
import { CoffeeStore } from "../model/products"

const store = new CoffeeStore()

// export default class ProductController {
    
// }

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





//  const responeUtil = (res:Response, statusCode:number, data:any, message:string, statusMessage:string)=>{
//   return  res.status(statusCode).json({
//         status:statusMessage,
//         message:message,
//         data: data
//     })
//  }
const createProduct = async   (req: Request, res: Response) =>  {
    console.log('abeg work')
    try {
        
        const id = new Date().getMilliseconds()
        const coffee: Product = {
                id: id,
                name: req.body.name,
                price: req.body.price,
                type:  req.body.type,
                origin: req.body.origin

        }
        console.log(coffee)
        const product = await store.createProduct(coffee)
        res.json(product)
    } catch (error) {
        res.status(500)
        res.json(error)
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
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            type:  req.body.type,
            origin: req.body.origin
        }

        const product = await store.updateProduct(coffee)
        res.json(product)
    } catch (error) {
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

const product_stores = (app: express.Application) => {
app.get('/coffees', getProductsall)
app.get('/coffees/:id', getProductById)
app.post('/coffees', createProduct)
app.patch('/coffees/:id', updateProduct)
app.delete('/coffees/:id', destroyProduct)
}

export default product_stores