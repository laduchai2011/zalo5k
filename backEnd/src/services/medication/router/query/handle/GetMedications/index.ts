import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedMedicationField, MedicationField, MedicationBodyField } from '@src/dataStruct/medication';
import QueryDB_GetMedications from '../../queryDB/GetMedications';

class Handle_GetMedications {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, MedicationBodyField>, res: Response) => {
        const medicationBody = req.body;

        const myResponse: MyResponse<PagedMedicationField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getMedications = new QueryDB_GetMedications();
        queryDB_getMedications.setMedicationBody(medicationBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getMedications.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getMedications.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rows: MedicationField[] = result.recordset;
                myResponse.data = { items: rows, totalCount: result.recordsets[1][0].totalCount };
                myResponse.message = 'Lấy thông tin những sản phẩm thuốc thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin những sản phẩm thuốc KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin những sản phẩm thuốc KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetMedications;
