import sql from 'mssql';
import { QueryDB } from '@src/services/medication/interface';
import { MedicationCommentField, MedicationCommentBodyField } from '@src/dataStruct/medication';

interface TotalCountField {
    totalCount: number;
}

type MedicationCommentQueryResult = {
    recordsets: [MedicationCommentField[], TotalCountField[]];
    recordset: MedicationCommentField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_GetMedicationComments extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _medicationCommentBody: MedicationCommentBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMedicationCommentBody(medicationCommentBody: MedicationCommentBodyField): void {
        this._medicationCommentBody = medicationCommentBody;
    }

    async run(): Promise<MedicationCommentQueryResult | void> {
        if (this._connectionPool !== undefined && this._medicationCommentBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('page', sql.Int, this._medicationCommentBody.page)
                    .input('size', sql.Int, this._medicationCommentBody.size)
                    .input('level', sql.Int, this._medicationCommentBody.level)
                    .input('medicationCommentId', sql.Int, this._medicationCommentBody.medicationCommentId)
                    .input('medicationId', sql.Int, this._medicationCommentBody.medicationId)
                    .execute('GetMedicationComments');

                return result as unknown as MedicationCommentQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetMedicationComments;
