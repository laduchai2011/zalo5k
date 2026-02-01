import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { AccountField } from '@src/dataStruct/account';
import QueryDB_GetAccountWithId from '../../queryDB/GetAccountWithId';

class Handle_GetAccountWithId {
    private _mssql_server = mssql_server;

    constructor() {
        this._mssql_server.init();
    }

    main = async (req: Request<any, any, any, { accountId: string }>, res: Response) => {
        const accountId = req.query.accountId;

        const myResponse: MyResponse<AccountField> = {
            isSuccess: false,
            message: 'Bắt đầu Handle_GetMe để lấy tài khoản admin hay thành viên (main) !',
        };

        const queryDB = new QueryDB_GetAccountWithId();
        queryDB.setAccountId(Number(accountId));

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
                const account: AccountField = { ...result?.recordset[0] };
                account.userName = '';
                account.password = '';
                account.phone = '';
                myResponse.data = account;
                myResponse.message = 'Lấy thông tin tài khoản thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin tài khoản KHÔNG thành công !';
                res.status(200).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin tài khoản KHÔNG thành công !!';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetAccountWithId;
