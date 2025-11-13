import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { MedicationImageField, MedicationImageBodyField } from '@src/dataStruct/medication';
import QueryDB_GetAllMedicationImages from '../../queryDB/GetAllMedicationImages';

class Handle_GetAllMedicationImages {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, MedicationImageBodyField>, res: Response) => {
        const medicationImageBody = req.body;

        const myResponse: MyResponse<MedicationImageField[]> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getAllMedicationImages = new QueryDB_GetAllMedicationImages();
        queryDB_getAllMedicationImages.setMedicationImageBody(medicationImageBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getAllMedicationImages.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getAllMedicationImages.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.data = result?.recordset;
                myResponse.message = 'Lấy tất cả hình ảnh sản phẩm thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy tất cả hình ảnh sản phẩm KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy tất cả hình ảnh sản phẩm KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetAllMedicationImages;
