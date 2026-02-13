import { mssql_server } from '@src/connect';
import ServiceRedis from '@src/cache/cacheRedis';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { AccountField } from '@src/dataStruct/account';
import {
    CreateReplyAccountBodyField,
    GetNotReplyAccountBodyField,
    GetReplyAccountBodyField,
} from '@src/dataStruct/account/body';
import MutateDB_CreateReplyAccount from '../../mutateDB/CreateReplyAccount';
import { verifyRefreshToken } from '@src/token';
import { prefix_cache_notReplyAccounts, prefix_cache_replyAccounts } from '@src/const/redisKey/account';

class Handle_CreateReplyAccount {
    private _mssql_server = mssql_server;
    private _serviceRedis = ServiceRedis.getInstance();

    constructor() {
        this._mssql_server.init();
        this._serviceRedis.init();
    }

    setup = async (
        req: Request<Record<string, never>, unknown, CreateReplyAccountBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<AccountField> = {
            isSuccess: false,
            message: 'Băt đầu (Handle_CreateReplyAccount-setup) !',
        };

        const createReplyAccountBody = req.body;
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
            if (createReplyAccountBody.accountId === id) {
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

    main = async (req: Request<Record<string, never>, unknown, CreateReplyAccountBodyField>, res: Response) => {
        const createReplyAccountBody = req.body;
        const chatRoomId = createReplyAccountBody.chatRoomId;

        const myResponse: MyResponse<AccountField> = {
            isSuccess: false,
            message: 'Băt đầu cập nhật (Handle_CreateReplyAccount-main) !',
        };

        const mutateDB = new MutateDB_CreateReplyAccount();
        mutateDB.setCreateReplyAccountBody(createReplyAccountBody);

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
                rData.password = '';
                rData.phone = '';

                // delete cache notReplyAccount
                const keyMaxPageRedis_n = `${prefix_cache_notReplyAccounts.key.maxPage_with_chatRoomId}_${chatRoomId}`;
                const keyBodyRedis_n = `${prefix_cache_notReplyAccounts.key.body_with_chatRoomId}_${chatRoomId}`;
                const maxPage_n = await this._serviceRedis.getData<number>(keyMaxPageRedis_n);
                const rBody_n = await this._serviceRedis.getData<GetNotReplyAccountBodyField>(keyBodyRedis_n);
                if (maxPage_n && rBody_n) {
                    const size_n = rBody_n.size;
                    for (let i: number = 0; i < maxPage_n; i++) {
                        const keyDataRedis_n = `${prefix_cache_notReplyAccounts.key.with_chatRoomId}_${chatRoomId}_${i + 1}_${size_n}`;
                        this._serviceRedis.deleteData(keyDataRedis_n);
                        this._serviceRedis.deleteData(keyBodyRedis_n);
                        this._serviceRedis.deleteData(keyMaxPageRedis_n);
                    }
                }

                // delete cache replyAccount
                const keyMaxPageRedis = `${prefix_cache_replyAccounts.key.maxPage_with_chatRoomId}_${chatRoomId}`;
                const keyBodyRedis = `${prefix_cache_replyAccounts.key.body_with_chatRoomId}_${chatRoomId}`;
                const maxPage = await this._serviceRedis.getData<number>(keyMaxPageRedis);
                const rBody = await this._serviceRedis.getData<GetReplyAccountBodyField>(keyBodyRedis);
                if (maxPage && rBody) {
                    const size = rBody.size;
                    for (let i: number = 0; i < maxPage; i++) {
                        const keyDataRedis = `${prefix_cache_replyAccounts.key.with_chatRoomId}_${chatRoomId}_${i + 1}_${size}`;
                        this._serviceRedis.deleteData(keyDataRedis);
                        this._serviceRedis.deleteData(keyBodyRedis);
                        this._serviceRedis.deleteData(keyMaxPageRedis);
                    }
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

export default Handle_CreateReplyAccount;
