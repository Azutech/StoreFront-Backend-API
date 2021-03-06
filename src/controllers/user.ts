import  { Request, Response } from 'express';
import User from '../interfaces/users';
import { UserStore } from '../model/user';
// import jwt from 'jsonwebtoken'

const userUX = new UserStore();

const getUser = async (req: Request, res: Response) => {
  try {
    const users = await userUX.getUsers();
    res.status(200).json({
      status: 'Success',
      message: 'User has been found',
      data: users,
    });
  } catch (error) {
    res.status(404).json({ message: 'Wrong User' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    
    const user: User = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    
      password: req.body.password
    };

    

    console.log(user);

    const userUI = await userUX.createUser(user);
    res.status(200).json(userUI);
  } catch (error) {
    console.log(error)
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


// const user_stores = (app: express.Application) => {

//   export default user_stores
