import sql from 'mssql';
import { QueryDB } from '@src/services/medication/interface';
import { MedicationField, MedicationBodyField } from '@src/dataStruct/medication';

interface TotalCountField {
    totalCount: number;
}

type MedicationQueryResult = {
    recordsets: [MedicationField[], TotalCountField[]];
    recordset: MedicationField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_GetMedications extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _medicationBody: MedicationBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMedicationBody(medicationBody: MedicationBodyField): void {
        this._medicationBody = medicationBody;
    }

    async run(): Promise<MedicationQueryResult | void> {
        if (this._connectionPool !== undefined && this._medicationBody !== undefined) {
            try {
                const userId = this._medicationBody.userId ? this._medicationBody.userId : null;

                const result = await this._connectionPool
                    .request()
                    .input('page', sql.Int, this._medicationBody.page)
                    .input('size', sql.Int, this._medicationBody.size)
                    .input('userId', sql.Int, userId)
                    .execute('GetMedications');

                return result as unknown as MedicationQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetMedications;
