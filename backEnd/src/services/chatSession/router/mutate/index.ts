import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateChatSession from './handle/CreateChatSession';

dotenv.config();

const router_mutate_chatSession: Router = express.Router();
const handle_createChatSession = new Handle_CreateChatSession();

router_mutate_chatSession.post(
    '/createChatSession',
    authentication,
    handle_createChatSession.setup,
    handle_createChatSession.isMyOa,
    handle_createChatSession.main
);

export default router_mutate_chatSession;
