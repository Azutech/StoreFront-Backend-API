import client from '../utils/database';
import { Orders } from '../interfaces/orders'


export class OrdersLog {
  async createOrder(order: Orders): Promise<Orders>{
    try {
      const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const conn = await client.connect();
      const values  = [order.status, order.userId]
      const result = await conn.query(sql, values)
      conn.release();
      return result.rows[0]
    } catch (error) {
    throw new Error (`could not create order ${error}`)
    }
  }

  async getAllOrders(): Promise<Orders[]> {
   try {
    const conn = await client.connect();
    const sql = 'SELECT * FROM orders';
    const result = await conn.query(sql)
    conn.release();
    return result.rows
   } catch (error) {
    throw new Error( `unable to fetch orders from database ${error}`) 
   }
  }

  async getOrderById(id: string ): Promise<Orders> {
    try {
      const sql = `SELECT * FROM orders WHERE id=${id}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(`could not find order with id ${id}. ${error}`);

    }
  }

  async showUserOrders(userId: string): Promise<Orders[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${userId};`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Something went wrong unable to get orders ID:${userId}.${error}`
      );
    }
  }

  async destroy(id: string): Promise<string> {
    try {
      const sql = `DELETE FROM orders WHERE id=${id}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(
        `Something went wrong unable to delete order with id = ${id}`
      );
    }

  } 
 
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Orders> {
    try {
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const addProduct = result.rows[0];
      conn.release();
      return addProduct;
    } catch (error) {
      throw new Error(`unable to add product with id ${productId} ${error}`);
    }

    

  }

  async activeOrders(id: string): Promise<Orders[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='active'`;
      const conn = await client.connect();
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (error) {
      throw new Error(
        `Something went wrong! No current orders for user id = ${id}`
      );
    }
  }

  async completedOrders(id: string): Promise<Orders[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
      const conn = await client.connect();
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (error) {
      throw new Error(
        `Something went wrong! No complete orders for user id = ${id}`
      );
    }
  }

}








