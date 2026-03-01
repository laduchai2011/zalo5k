import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateOrder from './handle/CreateOrder';

dotenv.config();

const router_mutate_order: Router = express.Router();
const handle_createOrder = new Handle_CreateOrder();

router_mutate_order.post(
    '/createOrder',
    authentication,
    handle_createOrder.setup,
    handle_createOrder.isChatRoom,
    handle_createOrder.main
);

export default router_mutate_order;
