import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import Handle_Signup from './handle/Signup';
import Handle_Signin from './handle/Signin';
import Handle_Signout from './handle/Signout';
import Handle_AddMember from './handle/AddMember';
import Handle_SetMemberReceiveMessage from './handle/SetMemberReceiveMessage';
import authentication from '@src/auth';

dotenv.config();

const router_mutate_account: Router = express.Router();
const handle_signup = new Handle_Signup();
const handle_signin = new Handle_Signin();
const handle_signout = new Handle_Signout();
const handle_addMember = new Handle_AddMember();
const handle_setMemberReceiveMessage = new Handle_SetMemberReceiveMessage();

router_mutate_account.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_mutate_account');
});

router_mutate_account.post(
    '/signup',
    handle_signup.isAccountCheckUserName,
    handle_signup.isAccountCheckPhone,
    handle_signup.main
);

router_mutate_account.post(
    '/addMember',
    authentication,
    handle_addMember.isAccountCheckUserName,
    handle_addMember.isAccountCheckPhone,
    handle_addMember.setup,
    handle_addMember.main
);

router_mutate_account.post('/setMemberReceiveMessage', authentication, handle_setMemberReceiveMessage.main);

router_mutate_account.post('/signin', handle_signin.main);

router_mutate_account.post('/signout', handle_signout.main);

export default router_mutate_account;
