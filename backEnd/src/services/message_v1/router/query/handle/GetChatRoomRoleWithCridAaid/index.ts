import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { ChatRoomRoleWithCridAaidBodyField } from '@src/dataStruct/chatRoom/body';
import QueryDB_GetChatRoomRoleWithCridAaid from '../../queryDB/GetChatRoomRoleWithCridAaid';
import { verifyRefreshToken } from '@src/token';

class Handle_GetChatRoomRoleWithCridAaid {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = (
        req: Request<Record<string, never>, unknown, ChatRoomRoleWithCridAaidBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetChatRoomRoleWithCridAaid-setup)',
        };

        const chatRoomRoleWithCridAaidBody = req.body;
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
            const chatRoomRoleWithCridAaidBody_cp = { ...chatRoomRoleWithCridAaidBody };
            chatRoomRoleWithCridAaidBody_cp.authorizedAccountId = id;
            res.locals.chatRoomRoleWithCridAaidBody = chatRoomRoleWithCridAaidBody_cp;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (_: Request, res: Response, next: NextFunction) => {
        const chatRoomRoleWithCridAaidBody = res.locals.chatRoomRoleWithCridAaidBody as ChatRoomRoleField;

        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetChatRoomRoleWithCridAaid-main)',
        };

        await this._mssql_server.init();

        const queryDB = new QueryDB_GetChatRoomRoleWithCridAaid();
        queryDB.setChatRoomRoleWithCridAaidBody(chatRoomRoleWithCridAaidBody);

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
                // myResponse.data = result.recordset[0];
                // myResponse.message = 'Lấy thông tin vai trò phòng hội thoại thành công !';
                // myResponse.isSuccess = true;
                // res.status(200).json(myResponse);
                // return;
                res.locals.chatRoomRole = result.recordset[0];
                next();
            } else {
                myResponse.message = 'Lấy thông tin vai trò phòng hội thoại KHÔNG thành công 1 !';
                res.status(200).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin vai trò phòng hội thoại KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };

    checkRole = async (_: Request, res: Response, next: NextFunction) => {
        const chatRoomRole = res.locals.chatRoomRole as ChatRoomRoleField;

        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetChatRoomRoleWithCridAaid-checkRole)',
        };

        const isRead = chatRoomRole.isRead;
        const isSend = chatRoomRole.isSend;

        if (isSend || isRead) {
            next();
        }

        myResponse.message = 'Bạn không có quyền xem nội dung này !';
        res.status(200).json(myResponse);
        return;
    };
}

export default Handle_GetChatRoomRoleWithCridAaid;
