import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_IsSignin from './handle/IsSignin';

dotenv.config();
const router_query_account: Router = express.Router();

const handle_isSignin = new Handle_IsSignin();

router_query_account.get('/isSignin', handle_isSignin.main);

export default router_query_account;
