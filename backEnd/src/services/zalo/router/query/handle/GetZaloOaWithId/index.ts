import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { ZaloOaWithIdBodyField } from '@src/dataStruct/zalo/body';
import QueryDB_GetZaloOaWithId from '../../queryDB/GetZaloOaWithId';
import { verifyRefreshToken } from '@src/token';
import { accountType_enum, accountType_type } from '@src/dataStruct/account';

class Handle_GetZaloOaWithId {
    private _mssql_server = mssql_server;

    checkRole = (req: Request<any, any, ZaloOaWithIdBodyField>, res: Response, next: NextFunction) => {
        const ZaloOaWithIdBody: ZaloOaWithIdBodyField = req.body;

        const myResponse: MyResponse<ZaloOaField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetZaloOaWithId-checkRole) !',
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
            const accountId = ZaloOaWithIdBody.accountId;
            if (id === accountId) {
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

    main = async (req: Request<any, any, ZaloOaWithIdBodyField>, res: Response) => {
        const role: accountType_type = res.locals.role as accountType_type;
        const zaloOaWithIdBody: ZaloOaWithIdBodyField = req.body;

        const myResponse: MyResponse<ZaloOaField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetZaloAppWithAccountId-main) !',
        };

        await this._mssql_server.init();

        const queryDB = new QueryDB_GetZaloOaWithId();
        queryDB.setZaloOaWithIdBody(zaloOaWithIdBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const zaloApp: ZaloOaField = { ...result?.recordset[0] };
                if (role === accountType_enum.MEMBER) {
                    // zaloApp.appId = 'Bạn không phải admin';
                    zaloApp.oaSecret = 'Bạn không phải admin';
                }
                myResponse.data = zaloApp;
                myResponse.message = 'Lấy thông tin zaloOa thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin zaloOa KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin zaloOa KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetZaloOaWithId;
