import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateNote from './handle/CreateNote';
// import Handle_CreateMedicationComment from './handle/CreateMedicationComment';
// import Handle_UpdateMessageStatus from './handle/UpdateMessageStatus';

dotenv.config();

const router_mutate_note: Router = express.Router();
const handle_createNote = new Handle_CreateNote();
// const handle_updateMessageStatus = new Handle_UpdateMessageStatus();

router_mutate_note.post('/createNote', authentication, handle_createNote.setup, handle_createNote.main);

// router_mutate_message.post(
//     '/updateMessageStatus',
//     authentication,
//     handle_updateMessageStatus.setup,
//     handle_updateMessageStatus.main
// );

export default router_mutate_note;
