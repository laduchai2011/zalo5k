import express, { Router } from 'express';
import authentication from '@src/auth';
import Handle_GetZaloAppWithAccountId from './handle/GetZaloAppWithAccountId';
import Handle_GetZaloOaListWith2Fk from './handle/GetZaloOaListWith2Fk';

const router_query_zalo: Router = express.Router();

const handle_getZaloAppWithAccountId = new Handle_GetZaloAppWithAccountId();
const handle_getZaloOaListWith2Fk = new Handle_GetZaloOaListWith2Fk();

router_query_zalo.post(
    '/getZaloAppWithAccountId',
    authentication,
    handle_getZaloAppWithAccountId.checkRole,
    handle_getZaloAppWithAccountId.main
);

router_query_zalo.post(
    '/getZaloOaListWith2Fk',
    authentication,
    handle_getZaloOaListWith2Fk.checkRole,
    handle_getZaloOaListWith2Fk.main
);

export default router_query_zalo;
