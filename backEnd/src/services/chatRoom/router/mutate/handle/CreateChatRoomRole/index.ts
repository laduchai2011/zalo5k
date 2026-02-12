import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { CreateChatRoomRoleBodyField } from '@src/dataStruct/chatRoom/body';
import MutateDB_CreateChatRoomRole from '../../mutateDB/CreateChatRoomRole';
import { verifyRefreshToken } from '@src/token';

class Handle_CreateChatRoomRole {
    private _mssql_server = mssql_server;

    constructor() {
        this._mssql_server.init();
    }

    setup = async (
        req: Request<Record<string, never>, unknown, CreateChatRoomRoleBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Băt đầu (Handle_CreateChatRoomRole-setup) !',
        };

        const createChatRoomRoleBody = req.body;
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
            if (createChatRoomRoleBody.accountId === id) {
                next();
            } else {
                myResponse.message = 'Bạn không có quyền này !';
                res.status(200).json(myResponse);
                return;
            }
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (req: Request<Record<string, never>, unknown, CreateChatRoomRoleBodyField>, res: Response) => {
        const createChatRoomRoleBody = req.body;

        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Băt đầu cập nhật (Handle_CreateChatRoomRole-main) !',
        };

        const mutateDB = new MutateDB_CreateChatRoomRole();
        mutateDB.setCreateChatRoomRoleBody(createChatRoomRoleBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB.set_connection_pool(connection_pool);
        } else {
            console.error('Kết nối cơ sở dữ liệu không thành công !');
        }

        try {
            const result = await mutateDB.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0];
                myResponse.message = 'Tạo thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Tạo KHÔNG thành công !';
                res.status(200).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Tạo KHÔNG thành công !!';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateChatRoomRole;
