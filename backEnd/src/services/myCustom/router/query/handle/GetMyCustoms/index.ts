import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedMyCustomField, MyCustomField, MyCustomBodyField } from '@src/dataStruct/myCustom';
import QueryDB_GetMyCustoms from '../../queryDB/GetMyCustoms';

class Handle_GetMyCustomss {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, MyCustomBodyField>, res: Response) => {
        const myCustomBody = req.body;

        const myResponse: MyResponse<PagedMyCustomField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getMyCustoms = new QueryDB_GetMyCustoms();
        queryDB_getMyCustoms.setMyCustomBody(myCustomBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getMyCustoms.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getMyCustoms.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rows: MyCustomField[] = result.recordset;
                myResponse.data = { items: rows, totalCount: result.recordsets[1][0].totalCount };
                myResponse.message = 'Lấy thông tin những khách hàng thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin những khách hàng KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin những khách hàng KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetMyCustomss;
