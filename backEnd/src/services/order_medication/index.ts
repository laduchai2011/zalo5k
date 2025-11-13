import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_get_order_medication from './get';
import router_post_order_medication from './post';

const service_order_medication: Express = express();

service_order_medication.use(`/get`, router_get_order_medication);
service_order_medication.use(`/post`, router_post_order_medication);

export default service_order_medication;
