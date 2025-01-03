import express from 'express';
import { UserController } from '../controllers';

export const userRouter = express.Router();
/**
 * @swagger
 * /api/resource:
 * get:
 * summary: Get a resource
 * description: Get a specific resource by ID.
 * parameters:
 * — in: path
 * name: id
 * required: true
 * description: ID of the resource to retrieve.
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Successful response
 */
userRouter.post('/login', UserController.login);
userRouter.post('/signup', UserController.signup);
