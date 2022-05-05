import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

let secret: string;


if (process.env.TOKEN_SECRET) {
    secret = process.env.TOKEN_SECRET;
  }
  
  const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      let token 
      
      if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
        
      }
      console.log(token)

      if (!token) {
        return res.status(401).json({message: 'Unauthorized!!'})
      } 

      const decoded = jwt.verify(token, secret) 
      console.log(decoded)


      next();
    } catch (error) {
      console.log(error)
      res
        .status(404)
        .json({ Message: 'You are not authorized for this service' });
    }
  };
  
  export default verifyToken;
  