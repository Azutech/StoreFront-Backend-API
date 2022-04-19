import client from '../utils/database';
import { User } from '../interfaces/users';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {
  async getUsers(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release()
      console.log("YEAH", result)
      const userproduct = result.rows
      return userproduct
    } catch (error) {
        throw new Error(`Can't find User ${error}`)
    }
  }

  async getUserId(id: string): Promise<User[]> {
      try {
          const sql = 'SELECT * FROM users WHERE id =($1)'
          const conn = await client.connect()
          const result = await conn.query(sql, [id])
          conn.release()
          console.log('YEAH', result)
          const userx = result.rows
          return userx
      } catch (error) {
        throw new Error(`Can't find User with this id:${id}, Err ${error}.`)
      }
  }
}
