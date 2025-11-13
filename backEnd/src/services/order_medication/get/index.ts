import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router_get_order_medication: Router = express.Router();

router_get_order_medication.get('/', (_: Request, res: Response) => {
    res.send('(GET) Express + TypeScript Server: router_get_order_medication');
});

export default router_get_order_medication;
