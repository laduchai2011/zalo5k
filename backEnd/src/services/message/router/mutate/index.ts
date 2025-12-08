import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateMessage from './handle/CreateMessage';
// import Handle_CreateMedicationComment from './handle/CreateMedicationComment';
import Handle_UpdateMessageStatus from './handle/UpdateMessageStatus';

dotenv.config();

const router_mutate_message: Router = express.Router();
const handle_createMessage = new Handle_CreateMessage();
const handle_updateMessageStatus = new Handle_UpdateMessageStatus();

router_mutate_message.post('/createMessage', authentication, handle_createMessage.setup, handle_createMessage.main);

router_mutate_message.post(
    '/updateMessageStatus',
    authentication,
    handle_updateMessageStatus.setup,
    handle_updateMessageStatus.main
);

export default router_mutate_message;
