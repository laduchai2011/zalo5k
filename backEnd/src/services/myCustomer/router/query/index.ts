import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_GetMyCustomers from './handle/GetMyCustomers';

dotenv.config();
const router_query_myCustomer: Router = express.Router();

const handle_getMyCustomers = new Handle_GetMyCustomers();

router_query_myCustomer.post('/getMyCustomers', handle_getMyCustomers.main);

export default router_query_myCustomer;
