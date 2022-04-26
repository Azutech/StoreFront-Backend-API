import express, { Request, Response } from 'express';
import { OrdersLog } from '../model/orders';
import { Orders } from '../interfaces/orders';
import {userTokken } from '../utils/authentication';
// import verifyToken from '../middleware/auth'

const store = new OrdersLog();

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await store.getAllOrders();
    res.status(200).json({
      status: 'Success',
      message: 'All orders were found successfully',
      data: result,
    });
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);
    const result = await store.getOrderById(ID);
    res.status(200).json({
      status: 'Success',
      message: 'This order has been found successfully',
      data: result,
    });
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const token = req.body.token || req.query.token || req.headers.token;

    const user_id = userTokken(token);

    const order: Orders = {
      status: req.body.status,
      quantity: req.body.quantity,
      user_id: Number(user_id),
    };
     console.log(order)
    
     const { product_id } = req.params


    const result = await store.createOrder( order, +product_id)
    res.status(200).json({
        status: 'Success',
        message: 'Order has been created successfully',
        data: result,
      });
  } catch (error) {
    console.log(error)
      res.status(404)
      res.json(error)
  }

};

const CompletedOrderbyUser = async (req:Request, res: Response) => {
    try {

        // const token = req.body.token || req.query.token || req.headers.token;

        // const user_id = userTokken(token).id

        // const result = await store.completedOrderbyUser(user_id)
        
        res.status(200).json({
            status: 'Success',
            message: 'Order has been created successfully',
            data: ""
          });

    } catch (error) {
      res.status(404)
      res.json(error)
    }
}
const ActiveOrderbyUser = async (req:Request, res: Response) => {
    try {

        // const token = req.body.token || req.query.token || req.headers.token;

        // const user_id = userTokken(token)

        // const result = await store.activeOrderbyUser(user_id)
        
        res.status(200).json({
            status: 'Success',
            message: 'Order has been created successfully',
            data: ""
          });

    } catch (error) {
      res.status(404)
      res.json(error)
    }
}

const destroyOrder = async (req: Request, res: Response) => {
  try {
    const result =await store.destroyOrder(Number(req.params.id));
    res.status(200).json({
        status: 'Success',
        message: 'Order has been deleted successfully',
        data: result,
      });
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};


// export default {getOrderById, createOrder, destroyOrder, getOrder, CompletedOrderbyUser, ActiveOrderbyUser}


const order_stores = (app: express.Application) => {
    app.get('/orders',  getOrder)
    app.get('/orders/:id',  getOrderById)
    app.post('/orders',  createOrder)
    // app.patch('/coffees/:id', updateProduct)
    app.delete('/orders/:id',destroyOrder)
    }
    
    export default order_stores