import sql from 'mssql';
import { QueryDB } from '@src/services/medication/interface';
import { MedicationField, MedicationBodyField } from '@src/dataStruct/medication';

class QueryDB_GetAMedication extends QueryDB {
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

    async run(): Promise<sql.IProcedureResult<MedicationField> | void> {
        if (this._connectionPool !== undefined && this._medicationBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('id', sql.Int, this._medicationBody.id)
                    .execute('GetAMedication');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetAMedication;
