import { Router } from 'express' 
import Order  from '../controllers/orders'
import verifyToken from '../middleware/auth'

const orderRouter = Router()


 orderRouter.get('/orders', Order.getAllOrders);
 orderRouter.get('/orders/:id', Order.getOrderById);
 orderRouter.post('/orders', verifyToken, Order.createOrder);
 orderRouter.get('/users/:id/active-orders', verifyToken, Order.activeOrders);
 orderRouter.get('/users/:id/orders', verifyToken, Order.showUserOrders);
 orderRouter.get('/users/:id/completed-orders', verifyToken, Order.completedOrders);
 orderRouter.post('orders/:id/product/:id', verifyToken, Order.addProduct )
 orderRouter.delete('/orders/:id', verifyToken, Order.destroyOrder);


 export default orderRouter