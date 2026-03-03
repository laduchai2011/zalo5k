import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateOrder from './handle/CreateOrder';
import Handle_UpdateOrder from './handle/UpdateOrder';

dotenv.config();

const router_mutate_order: Router = express.Router();
const handle_createOrder = new Handle_CreateOrder();
const handle_updateOrder = new Handle_UpdateOrder();

router_mutate_order.post(
    '/createOrder',
    authentication,
    handle_createOrder.setup,
    handle_createOrder.isChatRoom,
    handle_createOrder.main
);

router_mutate_order.patch(
    '/updateOrder',
    authentication,
    handle_updateOrder.setup,
    handle_updateOrder.isMyOrder,
    handle_updateOrder.main
);

export default router_mutate_order;
