import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedAccountField, AccountField } from '@src/dataStruct/account';
import { GetReplyAccountBodyField } from '@src/dataStruct/account/body';
import QueryDB_GetReplyAccounts from '../../queryDB/GetReplyAccounts';

class Handle_GetReplyAccounts {
    private _mssql_server = mssql_server;

    constructor() {
        this._mssql_server.init();
    }

    main = async (req: Request<Record<string, never>, unknown, GetReplyAccountBodyField>, res: Response) => {
        const getReplyAccountBody = req.body;

        const myResponse: MyResponse<PagedAccountField> = {
            isSuccess: false,
        };

        const queryDB = new QueryDB_GetReplyAccounts();
        queryDB.setGetReplyAccountBody(getReplyAccountBody);

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
                const rows: AccountField[] = result.recordset;
                myResponse.data = { items: rows, totalCount: result.recordsets[1][0].totalCount };
                myResponse.message = 'Lấy danh sách người trả lời tin nhắn thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy danh sách người trả lời tin nhắn KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy danh sách người trả lời tin nhắn KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetReplyAccounts;
