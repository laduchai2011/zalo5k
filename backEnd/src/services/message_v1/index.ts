import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// import router_query_message from './router/query';
// import router_mutate_message from './router/mutate';

const service_message_v1: Express = express();

// service_message.use(`/query`, router_query_message);
// service_message.use(`/mutate`, router_mutate_message);

export default service_message_v1;
