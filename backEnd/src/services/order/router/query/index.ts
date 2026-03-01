import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_GetOrders from './handle/GetOrders';

dotenv.config();
const router_query_order: Router = express.Router();

const handle_getOrders = new Handle_GetOrders();

router_query_order.post('/getOrders', authentication, handle_getOrders.setup, handle_getOrders.main);

export default router_query_order;
