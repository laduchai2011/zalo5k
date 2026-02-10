import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_UpdateSetupChatRoomRole from './handle/UpdateSetupChatRoomRole';

dotenv.config();

const router_mutate_chatRoom: Router = express.Router();
const handle_updateSetupChatRoomRole = new Handle_UpdateSetupChatRoomRole();

router_mutate_chatRoom.patch(
    '/updateSetupChatRoomRole',
    authentication,
    handle_updateSetupChatRoomRole.setup,
    handle_updateSetupChatRoomRole.main
);

export default router_mutate_chatRoom;
