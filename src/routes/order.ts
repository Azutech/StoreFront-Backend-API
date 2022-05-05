import { Router } from 'express' 
import Order  from '../controllers/orders'
import verifyToken from '../middleware/auth'

const order = Router()


 order.get('/orders', Order.getAllOrders);
 order.get('/orders/:id', Order.getOrderById);
 order.post('/orders', verifyToken, Order.createOrder);
 order.get('/users/:id/active-orders', verifyToken, Order.activeOrders);
 order.get('/users/:id/orders', verifyToken, Order.showUserOrders);
 order.get('/users/:id/completed-orders', verifyToken, Order.completedOrders);
 order.post('orders/:id/product/:id', verifyToken, Order.addProduct )
 order.delete('/orders/:id', verifyToken, Order.destroyOrder);


 export default order