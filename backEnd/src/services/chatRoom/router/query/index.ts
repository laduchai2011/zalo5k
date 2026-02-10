import express, { Router } from 'express';
import authentication from '@src/auth';
import Handle_GetChatRoomWithId from './handle/GetChatRoomWithId';
import Handle_GetChatRoomRoleWithCridAaid from './handle/GetChatRoomRoleWithCridAaid';

const router_query_chatRoom: Router = express.Router();

const handle_getChatRoomWithId = new Handle_GetChatRoomWithId();
const handle_getChatRoomRoleWithCridAaid = new Handle_GetChatRoomRoleWithCridAaid();

router_query_chatRoom.post('/getChatRoomWithId', authentication, handle_getChatRoomWithId.main);

router_query_chatRoom.post('/getChatRoomRoleWithCridAaid', authentication, handle_getChatRoomRoleWithCridAaid.main);

export default router_query_chatRoom;
