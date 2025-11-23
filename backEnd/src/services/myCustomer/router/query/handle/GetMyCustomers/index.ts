import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedMyCustomerField, MyCustomerField, MyCustomerBodyField } from '@src/dataStruct/myCustomer';
import QueryDB_GetMyCustoms from '../../queryDB/GetMyCustoms';

class Handle_GetMyCustomers {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, MyCustomerBodyField>, res: Response) => {
        const myCustomerBody = req.body;

        const myResponse: MyResponse<PagedMyCustomerField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getMyCustomers = new QueryDB_GetMyCustoms();
        queryDB_getMyCustomers.setMyCustomerBody(myCustomerBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getMyCustomers.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getMyCustomers.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rows: MyCustomerField[] = result.recordset;
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

export default Handle_GetMyCustomers;
