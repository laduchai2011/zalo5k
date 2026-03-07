import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateAgent from './handle/CreateAgent';
import Handle_AgentAddAccount from './handle/AgentAddAccount';

dotenv.config();

const router_mutate_agent: Router = express.Router();
const handle_createAgent = new Handle_CreateAgent();
const handle_agentAddAccount = new Handle_AgentAddAccount();

router_mutate_agent.post('/createAgent', authentication, handle_createAgent.setup, handle_createAgent.main);

router_mutate_agent.post('/agentAddAccount', authentication, handle_agentAddAccount.setup, handle_agentAddAccount.main);

export default router_mutate_agent;
