import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { placeOrder } from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';

const orderRouter= express.Router();

orderRouter.post('/place',authMiddleware,placeOrder)

export default orderRouter
