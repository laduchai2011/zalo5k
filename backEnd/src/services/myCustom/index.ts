import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_myCustom from './router/query';
import router_mutate_myCustom from './router/mutate';

const service_myCustom: Express = express();

service_myCustom.use(`/query`, router_query_myCustom);
service_myCustom.use(`/mutate`, router_mutate_myCustom);

export default service_myCustom;
