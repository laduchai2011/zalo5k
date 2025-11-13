import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_shoppingCart from './router/query';
import router_mutate_shoppingCart from './router/mutate';

const service_shoppingCart: Express = express();

service_shoppingCart.use(`/query`, router_query_shoppingCart);
service_shoppingCart.use(`/mutate`, router_mutate_shoppingCart);

export default service_shoppingCart;
