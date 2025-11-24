import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_GetMessages from './handle/GetMessages';
// import Handle_GetInforCustomerOnZalo from './handle/GetInforCustomerOnZalo';

dotenv.config();
const router_query_message: Router = express.Router();

const handle_getMessages = new Handle_GetMessages();
// const handle_getInforCustomerOnZalo = new Handle_GetInforCustomerOnZalo();

router_query_message.post('/getMessages', handle_getMessages.main);

// router_query_myCustomer.get('/getInforCustomerOnZalo', handle_getInforCustomerOnZalo.main);

export default router_query_message;
