import express, { Router } from 'express';
import authentication from '@src/auth';
import Handle_GetChatRoomWithId from './handle/GetChatRoomWithId';

const router_query_chatRoom: Router = express.Router();

const handle_getChatRoomWithId = new Handle_GetChatRoomWithId();

router_query_chatRoom.post('/getChatRoomWithId', authentication, handle_getChatRoomWithId.main);

export default router_query_chatRoom;
