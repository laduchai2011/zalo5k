import sql from 'mssql';
import { QueryDB } from '@src/services/medication/interface';
import { MedicationImageField, MedicationImageBodyField } from '@src/dataStruct/medication';

class QueryDB_GetAMedicationImage extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _medicationImageBody: MedicationImageBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMedicationImageBody(medicationImageBody: MedicationImageBodyField): void {
        this._medicationImageBody = medicationImageBody;
    }

    async run(): Promise<sql.IProcedureResult<MedicationImageField> | void> {
        if (this._connectionPool !== undefined && this._medicationImageBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('medicationId', sql.Int, this._medicationImageBody.medicationId)
                    .execute('GetAMedicationImage');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetAMedicationImage;
