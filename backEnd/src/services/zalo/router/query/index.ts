import express, { Router } from 'express';
import authentication from '@src/auth';
import Handle_GetZaloAppWithAccountId from './handle/GetZaloAppWithAccountId';

const router_query_zalo: Router = express.Router();

const handle_getZaloAppWithAccountId = new Handle_GetZaloAppWithAccountId();

router_query_zalo.post(
    '/getZaloAppWithAccountId',
    authentication,
    handle_getZaloAppWithAccountId.checkRole,
    handle_getZaloAppWithAccountId.main
);

export default router_query_zalo;
