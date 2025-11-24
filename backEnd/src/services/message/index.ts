import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_message from './router/query';
// import router_mutate_myCustomer from './router/mutate';

const service_message: Express = express();

router_query_message.use(`/query`, router_query_message);
// service_myCustomer.use(`/mutate`, router_mutate_myCustomer);

export default service_message;
