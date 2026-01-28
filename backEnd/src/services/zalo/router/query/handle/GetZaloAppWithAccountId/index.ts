import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ZaloAppField } from '@src/dataStruct/zalo';
import { ZaloAppWithAccountIdBodyField } from '@src/dataStruct/zalo/body';
import QueryDB_GetZaloAppWithAccountId from '../../queryDB/GetZaloAppWithAccountId';
import { verifyRefreshToken } from '@src/token';
import { accountType_enum, accountType_type } from '@src/dataStruct/account';

class Handle_GetZaloAppWithAccountId {
    private _mssql_server = mssql_server;

    checkRole = (req: Request<any, any, ZaloAppWithAccountIdBodyField>, res: Response, next: NextFunction) => {
        const zaloAppWithAccountIdBody: ZaloAppWithAccountIdBodyField = req.body;

        const myResponse: MyResponse<ZaloAppField> = {
            isSuccess: false,
            message: 'Bắt đầu Handle_GetMe để lấy tài khoản admin hay thành viên (setup) !',
        };

        const { refreshToken } = req.cookies;

        if (typeof refreshToken === 'string') {
            const verify_refreshToken = verifyRefreshToken(refreshToken);

            if (verify_refreshToken === 'invalid') {
                myResponse.message = 'Refresh-Token không hợp lệ, hãy đăng nhập lại !';
                res.status(500).json(myResponse);
                return;
            }

            if (verify_refreshToken === 'expired') {
                myResponse.message = 'Refresh-Token hết hạn, hãy đăng nhập lại !';
                res.status(500).json(myResponse);
                return;
            }

            const { id } = verify_refreshToken;
            const adminId = id as unknown as string;
            const accountId = zaloAppWithAccountIdBody.accountId;
            if (adminId === accountId) {
                res.locals.role = accountType_enum.ADMIN;
            } else {
                res.locals.role = accountType_enum.MEMBER;
            }

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (req: Request<any, any, ZaloAppWithAccountIdBodyField>, res: Response) => {
        const role: accountType_type = req.query.role as accountType_type;
        const zaloAppWithAccountIdBody: ZaloAppWithAccountIdBodyField = req.body;

        const myResponse: MyResponse<ZaloAppField> = {
            isSuccess: false,
            message: 'Bắt đầu Handle_GetZaloAppWithAccountId để lấy thông tin Zalo App (main) !',
        };

        await this._mssql_server.init();

        const queryDB_getMe = new QueryDB_GetZaloAppWithAccountId();
        queryDB_getMe.setZaloAppWithAccountIdBody(zaloAppWithAccountIdBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getMe.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getMe.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const zaloApp: ZaloAppField = { ...result?.recordset[0] };
                if (role === accountType_enum.MEMBER) {
                    zaloApp.appId = 'Bạn không phải admin';
                    zaloApp.appSecret = 'Bạn không phải admin';
                }
                myResponse.data = zaloApp;
                myResponse.message = 'Lấy thông tin zaloApp thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin zaloApp KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin zaloApp KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetZaloAppWithAccountId;
