import express from "express";
import { UserController } from "../controllers";

export const userRouter = express.Router();

userRouter.post('/login', UserController.login);
userRouter.post('/signup', UserController.signup);
