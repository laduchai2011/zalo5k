import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_GetChatRoomRoleWithCridAaid from './handle/GetChatRoomRoleWithCridAaid';
import Handle_GetMessagesForChatScreen from './handle/GetMessagesForChatScreen';

dotenv.config();
const router_query_message_v1: Router = express.Router();

const handle_getChatRoomRoleWithCridAaid = new Handle_GetChatRoomRoleWithCridAaid();
const handle_getMessagesForChatScreen = new Handle_GetMessagesForChatScreen();

router_query_message_v1.post(
    '/getMessagesForChatScreen',
    handle_getChatRoomRoleWithCridAaid.setup,
    handle_getChatRoomRoleWithCridAaid.main,
    handle_getChatRoomRoleWithCridAaid.passRole,
    handle_getMessagesForChatScreen.main
);

// router_query_message.post('/getMessagesHasFilter', handle_getMessagesHasFilter.main);

export default router_query_message_v1;
