import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_GetNotes from './handle/GetNotes';
// import Handle_GetInforCustomerOnZalo from './handle/GetInforCustomerOnZalo';
// import Handle_GetAIsNewMessage from './handle/GetAIsNewMessage';

dotenv.config();
const router_query_note: Router = express.Router();

const handle_getNotes = new Handle_GetNotes();
// const handle_getInforCustomerOnZalo = new Handle_GetInforCustomerOnZalo();
// const handle_getAIsNewMessage = new Handle_GetAIsNewMessage();

// router_query_myCustomer.post(
//     '/getMyCustomers',
//     authentication,
//     handle_getMyCustomers.setup,
//     handle_getMyCustomers.main
// );

router_query_note.get('/getNotes', authentication, handle_getNotes.main);

// router_query_myCustomer.post('/getAIsNewMessage', authentication, handle_getAIsNewMessage.main);

export default router_query_note;
