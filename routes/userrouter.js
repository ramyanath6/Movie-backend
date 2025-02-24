import { loginUser,registerUser } from "../controller/userController.js";
import express from 'express';




const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

export default userRouter;
