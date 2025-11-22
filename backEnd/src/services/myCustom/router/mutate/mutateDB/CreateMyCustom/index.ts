import sql from 'mssql';
import { MutateDB } from '@src/services/myCustom/interface';
import { MyCustomField, CreateMyCustomBodyField } from '@src/dataStruct/myCustom';

class MutateDB_CreateMyCustom extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createMyCustomBody: CreateMyCustomBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_createMedicationBody(createMyCustomBody: CreateMyCustomBodyField): void {
        this._createMyCustomBody = createMyCustomBody;
    }

    async run(): Promise<sql.IProcedureResult<MyCustomField> | undefined> {
        if (this._connectionPool !== undefined && this._createMyCustomBody !== undefined) {
            try {

                const result = await this._connectionPool
                    .request()
                    .input('senderId', sql.NVarChar(255), this._createMyCustomBody.senderId)
                    .input('accountId', sql.Int, this._createMyCustomBody.accountId)
                    .execute('CreateMyCustom');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateMyCustom;
