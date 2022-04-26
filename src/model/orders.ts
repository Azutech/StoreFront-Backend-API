import client from '../utils/database';
import { Orders } from '../interfaces/orders';

export class OrdersLog {
  async getAllOrders(): Promise<Orders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not fetch Orders from the database ${error}`);
    }
  }

  async getOrderById(id: number): Promise<Orders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = $1';
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows
    } catch (error) {
        throw new Error(`could not fetch this order: ${id}, from the database ${error}`);
    }
  }

  async createOrder(order: Orders, product_id: number){
     try {
       const conn = await client.connect()
       const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;'
       const values = [order.status, order.user_id]
       const res = await conn.query(sql, values)

       const res_id = Number(res.rows[0].id)

       const order_sql = 'INSERT INTO order_product (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;'
       const order_values = [order.quantity, res_id, product_id]

       await conn.query(order_sql, order_values)

       const product = await conn.query('SELECT name FROM products WHERE id = $1')
       const product_res = product.rows[0].name
       conn.release()

       const result = {
         order_id: res_id,
         product: product_res,
         quantity: order.quantity,
         status: order.status
       }

       return [result]

     } catch (error) {
       throw new Error(`Could not fetch data from the database ${error}`)
     }
  }

  async destroyOrder(id: number): Promise<Orders[]> {
    try {
         const conn = await client.connect();
         const sql =  "DELETE FROM orders WHERE id = $1 RETURNING *;"
         const result = await conn.query(sql, [id])
         conn.release();
         return result.rows;
    } catch (error) {
      throw new Error(`Could not fetch data from the database ${error}`)
    }
  }

  async activeOrderbyUser(user_id: number): Promise<Orders[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'active'";
        const values = [user_id];
        const res = await conn.query(sql, values);
        conn.release();
        return res.rows;
    } catch (error) {
        throw new Error(`could not connect fetch data from the db ${error}`);
    }
}
async completedOrderbyUser( user_id: number): Promise<Orders[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
        const values = [user_id];
        const res = await conn.query(sql, values);
        conn.release();
        return res.rows;
    } catch (error) {
        throw new Error(`could not connect fetch data from the db ${error}`);
    }
}




}
