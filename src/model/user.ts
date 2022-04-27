import client from '../utils/database';
import { User } from '../interfaces/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const pepper: string | undefined = process.env.BCRYPT_PASSWORD as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string)


export class UserStore {
  async getUsers(): Promise<User[]> {
    try {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      console.log('YEAH', result);
      const userproduct = result.rows;
      return userproduct;
    } catch (error) {
      throw new Error(`Can't find User ${error}`);
    }
  }

  async getUserById(id: number): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users WHERE id =($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      console.log('YEAH', result);
      const userx = result.rows;
      return userx;
    } catch (error) {
      throw new Error(`Can't find User with this id:${id}, Err ${error}.`);
    }
  }
  async createUser(user: User): Promise<User[]> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      const result = await conn.query(sql, [
        user.username,
        user.first_name,
        user.last_name,
        hash,
      ]);

      const token = jwt.sign({user: result.rows[0]}, process.env.TOKEN_SECRET as string, {expiresIn: '4d'})
      conn.release();
      console.log('YEAH', result);
      const createuser = result.rows[0];
      return [{token: token},createuser];
    } catch (error) {
      throw new Error(
        `Could not add new user ${user.first_name}. Error: ${error}`,
      );
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE username = ($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const uPassDigest = result.rows[0];
        if (
          bcrypt.compareSync(password + pepper, uPassDigest.password)
        ) {
          const sql = 'SELECT * FROM users WHERE username = ($1)';
          const User = await conn.query(sql, [username]);
          return User.rows[0];
        }

      }
        
      // const token = jwt.sign({user: result.rows[0]}, process.env.TOKEN_SECRET as string, {expiresIn: '4d'})  
      
      // return [{token: token }, ] 
      return null;
    } catch (error) {
      throw new Error(`cannot authenticate User: ${error}`);
    }
  }
  async deleteUser(id: number): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      // const user = result.rows[0];
      return !!result;
    } catch (error) {
      throw new Error(`unable delete user (${id}): ${error}`);
    }
  }

  
  async checker(username: string): Promise<boolean> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM users WHERE username = $1";
        const values = [username];
        const res = await conn.query(sql, values);

        conn.release();
        return res.rows[0] ? true : false;
    } catch (error) {
        throw new Error(`could not connect fetch data from the db ${error}`);
    }
}

}
