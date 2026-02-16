import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_GetChatRoomRoleWithCridAaid from './handle/GetChatRoomRoleWithCridAaid';
import Handle_GetMessagesForChatScreen from './handle/GetMessagesForChatScreen';
import Handle_GetLastMessage from './handle/GetLastMessage';

dotenv.config();
const router_query_message_v1: Router = express.Router();

const handle_getChatRoomRoleWithCridAaid = new Handle_GetChatRoomRoleWithCridAaid();
const handle_getMessagesForChatScreen = new Handle_GetMessagesForChatScreen();
const handle_getLastMessage = new Handle_GetLastMessage();

router_query_message_v1.post(
    '/getMessagesForChatScreen',
    authentication,
    handle_getChatRoomRoleWithCridAaid.setup,
    handle_getChatRoomRoleWithCridAaid.main,
    handle_getChatRoomRoleWithCridAaid.passRole,
    handle_getMessagesForChatScreen.main
);

router_query_message_v1.get(
    '/getLastMessage',
    authentication,
    handle_getLastMessage.setup,
    handle_getLastMessage.getRole,
    handle_getLastMessage.isPassRole,
    handle_getLastMessage.main
);

export default router_query_message_v1;
