import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { NoteField, CreateNoteBodyField } from '@src/dataStruct/note';
import { verifyRefreshToken } from '@src/token';
import MutateDB_CreateNote from '../../mutateDB/CreateNote';
// import { produceTask } from '@src/queueRedis/producer';

class Handle_CreateNote {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (
        req: Request<Record<string, never>, unknown, CreateNoteBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<NoteField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const createNoteBody = req.body;
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
            const newCreateNoteBody_cp = { ...createNoteBody };
            newCreateNoteBody_cp.accountId = id;
            res.locals.createNoteBody = newCreateNoteBody_cp;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (_: Request, res: Response) => {
        const createNoteBody = res.locals.createNoteBody as CreateNoteBodyField;

        const myResponse: MyResponse<NoteField> = {
            isSuccess: false,
        };

        const mutateDB_createNote = new MutateDB_CreateNote();
        mutateDB_createNote.setCreateNoteBody(createNoteBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_createNote.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await mutateDB_createNote.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0];
                // produceTask<OrderField>('addOrder-to-provider', data);
                myResponse.message = 'Tạo ghi chú thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Tạo ghi chú KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Tạo ghi chú KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateNote;
