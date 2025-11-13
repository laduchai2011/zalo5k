import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_GetAllShoppingCarts from './handle/GetAllShoppingCarts';

dotenv.config();
const router_query_shoppingCart: Router = express.Router();

const handle_getAllShoppingCarts = new Handle_GetAllShoppingCarts();

router_query_shoppingCart.post(
    '/getAllShoppingCarts',
    handle_getAllShoppingCarts.setup,
    handle_getAllShoppingCarts.main
);

export default router_query_shoppingCart;
