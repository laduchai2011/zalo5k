import sql from 'mssql';
import { QueryDB } from '@src/services/note/interface';
import { NoteField, NoteBodyField } from '@src/dataStruct/note';

interface TotalCountField {
    totalCount: number;
}

type NoteQueryResult = {
    recordsets: [NoteField[], TotalCountField[]];
    recordset: NoteField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_GetNotes extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _noteBody: NoteBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setNoteBody(noteBody: NoteBodyField): void {
        this._noteBody = noteBody;
    }

    async run(): Promise<NoteQueryResult | void> {
        if (this._connectionPool !== undefined && this._noteBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('page', sql.Int, this._noteBody.page)
                    .input('size', sql.Int, this._noteBody.size)
                    .input('customerId', sql.NVarChar(255), this._noteBody.customerId)
                    .input('accountId', sql.Int, this._noteBody.accountId)
                    .execute('GetMyNotes');

                return result as unknown as NoteQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetNotes;
