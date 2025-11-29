import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateMessageText from './handle/CreateMessageText';
// import Handle_CreateMedicationComment from './handle/CreateMedicationComment';

dotenv.config();

const router_mutate_message: Router = express.Router();
const handle_createMessageText = new Handle_CreateMessageText();
// const handle_createMedicationComment = new Handle_CreateMedicationComment();

router_mutate_message.post(
    '/createMessageText',
    authentication,
    handle_createMessageText.setup,
    handle_createMessageText.main
);

// router_mutate_medication.post(
//     '/createMedicationComment',
//     authentication,
//     handle_createMedicationComment.setup,
//     handle_createMedicationComment.main
// );

export default router_mutate_message;
