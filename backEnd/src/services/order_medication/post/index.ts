import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router_post_order_medication: Router = express.Router();

router_post_order_medication.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_get_order_medication');
});

export default router_post_order_medication;
