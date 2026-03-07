import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_GetAgents from './handle/GetAgents';

dotenv.config();
const router_query_agent: Router = express.Router();
const handle_getAgents = new Handle_GetAgents();

router_query_agent.post('/createAgent', authentication, handle_getAgents.setup, handle_getAgents.main);

export default router_query_agent;
