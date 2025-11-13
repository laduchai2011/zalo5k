import sql from 'mssql';
import { MutateDB } from '@src/services/medication/interface';
import { MedicationCommentField, CreateMedicationCommentBodyField } from '@src/dataStruct/medication';

class MutateDB_CreateMedicationComment extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createMedicationCommentBody: CreateMedicationCommentBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_createMedicationCommentBody(createMedicationCommentBody: CreateMedicationCommentBodyField): void {
        this._createMedicationCommentBody = createMedicationCommentBody;
    }

    async run(): Promise<sql.IProcedureResult<MedicationCommentField> | undefined> {
        if (this._connectionPool !== undefined && this._createMedicationCommentBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('content', sql.NVarChar(255), this._createMedicationCommentBody.content)
                    .input('level', sql.Int, this._createMedicationCommentBody.level)
                    .input('medicationCommentId', sql.Int, this._createMedicationCommentBody.medicationCommentId)
                    .input('medicationId', sql.Int, this._createMedicationCommentBody.medicationId)
                    .input('accountId', sql.Int, this._createMedicationCommentBody.accountId)
                    .execute('CreateMedicationComment');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateMedicationComment;
