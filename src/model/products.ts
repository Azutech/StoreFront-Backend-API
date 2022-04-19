/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from '../utils/database';
import product, { Product } from '../interfaces/products';

export class CoffeeStore {
  async getProductsall(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      console.log('kkk', result);
      const products = result.rows;
      return products;
    } catch (error) {
      throw new Error(`could not find products. Not Found: ${error}`);
    }
  }

  async getProductsById(id: number): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)';
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`could not find products ${id}. Not Found: ${error}`);
    }
  }
  async createProduct(prod: product): Promise<Product[]> {
    try {
      const sql =
        'INSERT INTO products (name, price, type, origin) VALUES ($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.type,
        prod.origin,
      ]);
      const products = result.rows[0];
      console.log('kkk', result);
      conn.release();
      return products;
    } catch (error) {
      throw new Error(`can't this coffee with id ${prod.name}, ${error}`);
    }
  }

  async destroyProduct(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete these products ${id}. REVERT: ${error}`,
      );
    }
  }
  async updateProduct(prod: product): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'UPDATE products SET name = ($1), price = ($2) WHERE id = ($3) RETURNING *';
        // 'UPDATE storeback SET name = ($1), type = ($2) WHERE id = ($3) RETURNING *';
      const values: (string | number)[] = [
        
        prod.name,
        prod.price,
        prod.type,
        prod.origin,
      ];
      const result = await conn.query(sql, values);
      const product = result.rows[0];
      conn.release()
      return product
    } catch (error) {
      throw new Error(
        `could not find add new products ${prod.name}. Not Found: ${error}`,
      );
    }
  }
}
