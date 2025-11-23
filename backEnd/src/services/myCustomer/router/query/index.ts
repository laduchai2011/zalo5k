import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_GetMyCustomers from './handle/GetMyCustomers';
import Handle_GetInforCustomerOnZalo from './handle/GetInforCustomerOnZalo';

dotenv.config();
const router_query_myCustomer: Router = express.Router();

const handle_getMyCustomers = new Handle_GetMyCustomers();
const handle_getInforCustomerOnZalo = new Handle_GetInforCustomerOnZalo();

router_query_myCustomer.post('/getMyCustomers', handle_getMyCustomers.setup, handle_getMyCustomers.main);

router_query_myCustomer.get('/getInforCustomerOnZalo', handle_getInforCustomerOnZalo.main);

export default router_query_myCustomer;
