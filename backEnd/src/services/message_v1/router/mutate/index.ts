import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_GetChatRoomRoleWithCridAaid from './handle/GetChatRoomRoleWithCridAaid';
import Handle_CreateMessageV1 from './CreateMessageV1';

dotenv.config();

const router_mutate_message_v1: Router = express.Router();
const handle_getChatRoomRoleWithCridAaid = new Handle_GetChatRoomRoleWithCridAaid();
const handle_createMessageV1 = new Handle_CreateMessageV1();

router_mutate_message_v1.post(
    '/createMessageV1',
    authentication,
    handle_getChatRoomRoleWithCridAaid.setup,
    handle_getChatRoomRoleWithCridAaid.main,
    handle_getChatRoomRoleWithCridAaid.passRole,
    handle_createMessageV1.getZaloApp,
    handle_createMessageV1.getZaloOa,
    handle_createMessageV1.setup,
    handle_createMessageV1.main
);

export default router_mutate_message_v1;
