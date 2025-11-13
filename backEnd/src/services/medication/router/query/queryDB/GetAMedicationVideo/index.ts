import sql from 'mssql';
import { QueryDB } from '@src/services/medication/interface';
import { MedicationVideoField, MedicationVideoBodyField } from '@src/dataStruct/medication';

class QueryDB_GetAMedicationVideo extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _medicationVideoBody: MedicationVideoBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMedicationVideoBody(medicationVideoBody: MedicationVideoBodyField): void {
        this._medicationVideoBody = medicationVideoBody;
    }

    async run(): Promise<sql.IProcedureResult<MedicationVideoField> | void> {
        if (this._connectionPool !== undefined && this._medicationVideoBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('medicationId', sql.Int, this._medicationVideoBody.medicationId)
                    .execute('GetAMedicationVideo');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetAMedicationVideo;
