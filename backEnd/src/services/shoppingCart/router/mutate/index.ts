import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_CreateShoppingCart from './handle/CreateShoppingCart';
import Handle_AddMedicationToShoppingCart from './handle/AddMedicationToShoppingCart';

dotenv.config();

const router_mutate_shoppingCart: Router = express.Router();
const handle_createShoppingCart = new Handle_CreateShoppingCart();
const handle_addMedicationToShoppingCart = new Handle_AddMedicationToShoppingCart();

router_mutate_shoppingCart.post('/createShoppingCart', handle_createShoppingCart.setup, handle_createShoppingCart.main);

router_mutate_shoppingCart.post('/addMedicationToShoppingCart', handle_addMedicationToShoppingCart.main);

export default router_mutate_shoppingCart;
