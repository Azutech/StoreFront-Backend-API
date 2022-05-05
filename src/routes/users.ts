import { Router } from "express";
import User from "../controllers/user"
import verifyToken from "../middleware/auth";

const userRouter = Router()

userRouter.get('/users', User.getUser)
  userRouter.get('/users/:id', verifyToken, User.getUserById)
  userRouter.post('/users', verifyToken, User.createUser)
  userRouter.post("/login", verifyToken, User.authenticate)
  userRouter.delete('/users/:id', verifyToken, User.destroyedUser)
  
  export default userRouter