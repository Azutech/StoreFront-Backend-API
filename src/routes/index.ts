import {Router} from "express"
import userRouter from "./users";
import productRouter from "./products";
import orderRouter from "./orders";

const routes = Router()


routes.use("/users", userRouter)
routes.use('/products', productRouter)
routes.use('/orders', orderRouter)


export default routes