import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedNoteField, NoteField } from '@src/dataStruct/note';
import { GetNotesBodyField } from '@src/dataStruct/note/body';
import QueryDB_GetNotes from '../../queryDB/GetNotes';

class Handle_GetNotes {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, GetNotesBodyField>, res: Response) => {
        const getNotesBody = req.body;

        const myResponse: MyResponse<PagedNoteField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB = new QueryDB_GetNotes();
        queryDB.setGetNotesBody(getNotesBody);

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
                const rows: NoteField[] = result.recordset;
                myResponse.data = { items: rows, totalCount: result.recordsets[1][0].totalCount };
                myResponse.message = 'Lấy ghi chú thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy ghi chú KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy ghi chú KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetNotes;
