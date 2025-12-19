import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_IsSignin from './handle/IsSignin';
import Handle_GetAllMembers from './handle/GetAllMembers';
import Handle_GetMemberReceiveMessage from './handle/GetMemberReceiveMessage';
import Handle_GetAccountInformation from './handle/GetAccountInformation';
import authentication from '@src/auth';

dotenv.config();
const router_query_account: Router = express.Router();

const handle_isSignin = new Handle_IsSignin();
const handle_getAllMembers = new Handle_GetAllMembers();
const handle_getMemberReceiveMessage = new Handle_GetMemberReceiveMessage();
const handle_getAccountInformation = new Handle_GetAccountInformation();

router_query_account.get('/isSignin', authentication, handle_isSignin.main);

router_query_account.post('/getAllMembers', authentication, handle_getAllMembers.setup, handle_getAllMembers.main);

router_query_account.get('/getMemberReceiveMessage', authentication, handle_getMemberReceiveMessage.main);

router_query_account.get(
    '/getAccountInformation',
    authentication,
    handle_getAccountInformation.setup,
    handle_getAccountInformation.main
);

export default router_query_account;
