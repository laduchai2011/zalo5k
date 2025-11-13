import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_medication from './router/query';
import router_mutate_medication from './router/mutate';

const service_medication: Express = express();

service_medication.use(`/query`, router_query_medication);
service_medication.use(`/mutate`, router_mutate_medication);

export default service_medication;
