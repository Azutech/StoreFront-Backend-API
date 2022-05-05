import { Request, Response } from 'express';
import { OrdersLog } from '../model/orders';
import  { Orders } from '../interfaces/orders';


const store = new OrdersLog();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.getAllOrders();
    res.status(200).json({
      status: 'Success',
      message: 'All Orders has been found',
      data: orders,
    });
  } catch (error) {
    res.status(404);
    res.json({ message: 'No Order was found' });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await store.getOrderById(req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been found',
      data: order,
    });
  } catch (error) {
    res.status(404);
    res.json({ message: 'This order was not found' });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Orders = {
      status: req.body.status,
      userId: req.body.user_id,
    };

    console.log(order)

    const orders = await store.createOrder(order);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been found',
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json({ message: 'Cant create order' });
  }
};

const destroyOrder = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await store.destroy(req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been deleted',
      data: deleteOrder,
    });
  } catch (error) {
    res.status(404);
    res.json({ message: 'Cant delete order' });
  }
};

const showUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.showUserOrders(req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'This Order shows',
      data: orders,
    });
  } catch (error) {
    res.status(404);
    res.json({ message: 'Cant show order' });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId = req.body.id;
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity, 10);

  try {
    const addProduct = await store.addProduct(quantity, orderId, productId);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been added',
      data: addProduct,
    });
  } catch (error) {
    console.log(error)
    res.status(404);
    res.json({ message: 'Cant add order' });
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const completeOrder = await store.completedOrders(req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been completed',
      data: completeOrder,
    });
  } catch (err) {
    res.status(404);
    res.json({ message: 'Order has not been completed' });
  }
};


const activeOrders = async (req: Request, res: Response) => {
  try {
    const currentOrder = await store.activeOrders(req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'This Order has been completed',
      data: currentOrder,
    });
  } catch (err) {
    res.status(404);
    res.json({ message: 'Can not find this order' });
  }
};

export default {getOrderById, createOrder, destroyOrder, getAllOrders, showUserOrders, completedOrders, activeOrders, addProduct}

// const order_stores = (app: express.Application) => {
//   app.get('/orders', getAllOrders);
//   app.get('/orders/:id', getOrderById);
//   app.post('/orders', createOrder);
//   app.get('/users/:id/active-orders', activeOrders);
//   app.get('/users/:id/orders', showUserOrders);
//   app.get('/users/:id/completed-orders', completedOrders);
//   app.post('orders/:id/product/:id', addProduct )
//   app.delete('/orders/:id', destroyOrder);
// };

// export default order_stores;
