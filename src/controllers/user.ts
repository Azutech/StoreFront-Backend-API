import { Request, Response } from 'express';
import User from '../interfaces/users';
import { UserStore } from '../model/user';
// import jwt from 'jsonwebtoken'

const userUX = new UserStore();

const getUser = async (req: Request, res: Response) => {
  try {
    const users = await userUX.getUsers();
    res.status(200).json({
      status: 'Success',
      message: 'All products were found successfully',
      data: users,
    });
  } catch (error) {
    res.status(404).json({ message: 'Wrong User' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    if (!(req.query.username || req.query.password)) {
      return res.status(400).json({
        error: 'Missing Username or Password',
      });
    }
    const user: User = {
      username: req.query.username as string,
      first_name: req.query.first_name as string,
      last_name: req.query.last_name as string,
      password_digest: req.query.password_digest as string,
      password: req.query.password as string
    };

    

    console.log(user);

    const userUI = await userUX.createUser(user);
    res.status(200).json(userUI);
  } catch (error) {
    return res.status(404).json({ error: `Can't create user` });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userUX.getUserById(parseInt(req.params.id));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json('user not found');
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
      const userproduct = await userUX.checker(username)

      if(userproduct){
          const result = await userUX.authenticate(username, password)
          const response = {
              status: 'success',
              statusCode: 200,
              response: result
          }
          return res.status(200).json(response)

      } else {
          return res.status(404).json({message : `user with ${username} not found` })
      }
     
    

  } catch (error) {
      return res.status(400).json(error)
  }
};

const destroyedUser = async (req: Request, res: Response) => {
  try {
    await userUX.deleteUser(parseInt(req.params.id));
    res.status(200).json({ status: `Deleted user ${req.params.id}` });
  } catch (error) {
    res.status(404).json(error);
  }
};

export default { createUser, getUser, getUserById, destroyedUser, authenticate };
