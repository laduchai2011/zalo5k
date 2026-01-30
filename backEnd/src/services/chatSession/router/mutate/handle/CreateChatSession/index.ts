import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ChatSessionField } from '@src/dataStruct/chatSession';
import { ChatSessionBodyField } from '@src/dataStruct/chatSession/body';
import { verifyRefreshToken } from '@src/token';
import MutateDB_CreateChatSession from '../../mutateDB/CreateChatSession';

class Handle_CreateChatSession {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (
        req: Request<Record<string, never>, unknown, ChatSessionBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<ChatSessionField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_CreateChatSession-setup)',
        };

        await this._mssql_server.init();

        const chatSessionBody = req.body;
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
            const chatSessionBody_cp = { ...chatSessionBody };
            chatSessionBody_cp.selectedAccountId = id;
            chatSessionBody_cp.accountId = id;
            res.locals.chatSessionBody = chatSessionBody_cp;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (_: Request, res: Response) => {
        const chatSessionBody = res.locals.chatSessionBody as ChatSessionBodyField;

        const myResponse: MyResponse<ChatSessionField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_CreateChatSession-main)',
        };

        const mutateDB = new MutateDB_CreateChatSession();
        mutateDB.setChatSessionBody(chatSessionBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await mutateDB.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0];
                myResponse.message = 'Tạo phiên chat thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Tạo phiên chat KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Tạo phiên chat KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateChatSession;
