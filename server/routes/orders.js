import express from 'express';
import { getOrders } from '../controller/ordersController.js';
const router = express.Router();

// Route to get all orders
router.get('/orders/all', getOrders);

// Route to get orders by status
router.get('/orders/:status', getOrders);

export default router;