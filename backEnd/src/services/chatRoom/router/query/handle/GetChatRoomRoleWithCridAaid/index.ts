import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { ChatRoomRoleWithCridAaidBodyField } from '@src/dataStruct/chatRoom/body';
import QueryDB_GetChatRoomRoleWithCridAaid from '../../queryDB/GetChatRoomRoleWithCridAaid';

class Handle_GetChatRoomRoleWithCridAaid {
    private _mssql_server = mssql_server;

    constructor() {
        this._mssql_server.init();
    }

    main = async (req: Request<Record<string, never>, unknown, ChatRoomRoleWithCridAaidBodyField>, res: Response) => {
        const chatRoomRoleWithCridAaidBody = req.body;
        const myResponse: MyResponse<ChatRoomRoleField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetChatRoomRoleWithCridAaid-main)',
        };

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
                myResponse.data = result.recordset[0];
                myResponse.message = 'Lấy thông tin quyền truy cập phòng hội thoại thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin quyền truy cập phòng hội thoại KHÔNG thành công 1 !';
                res.status(200).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin quyền truy cập phòng hội thoại KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetChatRoomRoleWithCridAaid;
