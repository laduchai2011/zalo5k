import { mssql_server } from '@src/connect';
import ServiceRedis from '@src/cache/cacheRedis';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { UpdateSetupChatRoomRoleBodyField } from '@src/dataStruct/chatRoom/body';
import MutateDB_UpdateSetupChatRoomRole from '../../mutateDB/UpdateSetupChatRoomRole';
import { verifyRefreshToken } from '@src/token';
import { prefix_cache_chatRoomRole } from '@src/const/redisKey/chatRoom';

class Handle_UpdateSetupChatRoomRole {
    private _mssql_server = mssql_server;
    private _serviceRedis = ServiceRedis.getInstance();

    constructor() {
        this._mssql_server.init();
        this._serviceRedis.init();
    }

    setup = async (
        req: Request<Record<string, never>, unknown, UpdateSetupChatRoomRoleBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Băt đầu (Handle_UpdateSetupChatRoomRole-setup) !',
        };

        const updateSetupChatRoomRoleBody = req.body;
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
            if (updateSetupChatRoomRoleBody.accountId === id) {
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

    main = async (req: Request<Record<string, never>, unknown, UpdateSetupChatRoomRoleBodyField>, res: Response) => {
        const updateSetupChatRoomRoleBody = req.body;

        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Băt đầu cập nhật (Handle_UpdateSetupChatRoomRole-main) !',
        };

        const mutateDB = new MutateDB_UpdateSetupChatRoomRole();
        mutateDB.setUpdateSetupChatRoomRoleBody(updateSetupChatRoomRoleBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB.set_connection_pool(connection_pool);
        } else {
            console.error('Kết nối cơ sở dữ liệu không thành công !');
        }

        try {
            const result = await mutateDB.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rData = result.recordset[0];
                const crid = rData.chatRoomId;
                const aaid = rData.authorizedAccountId;
                const keyRedis = `${prefix_cache_chatRoomRole.key.with_crid_Aaid}_${crid}_${aaid}`;
                const isDel = this._serviceRedis.deleteData(keyRedis);
                if (!isDel) {
                    console.error('Failed to delete key in Redis', keyRedis);
                }

                const data = rData;
                myResponse.message = 'Cập nhật thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Cập nhật KHÔNG thành công 1 !';
                res.status(200).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Cập nhật KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_UpdateSetupChatRoomRole;
