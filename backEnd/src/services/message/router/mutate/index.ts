import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateMessage from './handle/CreateMessage';
// import Handle_CreateMedicationComment from './handle/CreateMedicationComment';

dotenv.config();

const router_mutate_message: Router = express.Router();
const handle_createMessage = new Handle_CreateMessage();
// const handle_createMedicationComment = new Handle_CreateMedicationComment();

router_mutate_message.post('/createMessage', authentication, handle_createMessage.setup, handle_createMessage.main);

// router_mutate_medication.post(
//     '/createMedicationComment',
//     authentication,
//     handle_createMedicationComment.setup,
//     handle_createMedicationComment.main
// );

export default router_mutate_message;
