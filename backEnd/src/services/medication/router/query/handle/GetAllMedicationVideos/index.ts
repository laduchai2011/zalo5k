import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { MedicationVideoField, MedicationVideoBodyField } from '@src/dataStruct/medication';
import QueryDB_GetAllMedicationVideos from '../../queryDB/GetAllMedicationVideos';

class Handle_GetAllMedicationVideos {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, MedicationVideoBodyField>, res: Response) => {
        const medicationVideoBody = req.body;

        const myResponse: MyResponse<MedicationVideoField[]> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getAllMedicationVideos = new QueryDB_GetAllMedicationVideos();
        queryDB_getAllMedicationVideos.setMedicationVideoBody(medicationVideoBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getAllMedicationVideos.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getAllMedicationVideos.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.data = result?.recordset;
                myResponse.message = 'Lấy tất cả thước phim sản phẩm thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy tất cả thước phim sản phẩm KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy tất cả thước phim sản phẩm KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetAllMedicationVideos;
