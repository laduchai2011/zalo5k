import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { CreateMedicationCommentBodyField, MedicationCommentField } from '@src/dataStruct/medication';
import { verifyRefreshToken } from '@src/token';
import MutateDB_CreateMedicationComment from '../../mutateDB/CreateMedicationComment';
// import { produceTask } from '@src/queueRedis/producer';

class Handle_CreateMedicationComment {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (
        req: Request<Record<string, never>, unknown, CreateMedicationCommentBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<MedicationCommentField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const createMedicationCommentBody = req.body;
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
            const newMedicationCommentBody_cp = { ...createMedicationCommentBody };
            newMedicationCommentBody_cp.accountId = id;
            res.locals.createMedicationCommentBody = newMedicationCommentBody_cp;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (_: Request, res: Response) => {
        const createMedicationCommentBody = res.locals.createMedicationCommentBody as CreateMedicationCommentBodyField;

        const myResponse: MyResponse<MedicationCommentField> = {
            isSuccess: false,
        };

        const mutateDB_createMedicationComment = new MutateDB_CreateMedicationComment();
        mutateDB_createMedicationComment.set_createMedicationCommentBody(createMedicationCommentBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_createMedicationComment.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await mutateDB_createMedicationComment.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0];
                // produceTask<OrderField>('addOrder-to-provider', data);
                myResponse.message = 'Tạo bình luận thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Tạo bình luận KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Tạo bình luận KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateMedicationComment;
