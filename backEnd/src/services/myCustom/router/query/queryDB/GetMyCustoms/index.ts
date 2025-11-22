import sql from 'mssql';
import { QueryDB } from '@src/services/myCustom/interface';
import { MyCustomField, MyCustomBodyField } from '@src/dataStruct/myCustom';

interface TotalCountField {
    totalCount: number;
}

type MyCustomQueryResult = {
    recordsets: [MyCustomField[], TotalCountField[]];
    recordset: MyCustomField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_GetMyCustoms extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _myCustomBody: MyCustomBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMyCustomBody(myCustomBody: MyCustomBodyField): void {
        this._myCustomBody = myCustomBody;
    }

    async run(): Promise<MyCustomQueryResult | void> {
        if (this._connectionPool !== undefined && this._myCustomBody !== undefined) {
            try {
                const accountId = this._myCustomBody.accountId ? this._myCustomBody.accountId : null;

                const result = await this._connectionPool
                    .request()
                    .input('page', sql.Int, this._myCustomBody.page)
                    .input('size', sql.Int, this._myCustomBody.size)
                    .input('accountId', sql.Int, accountId)
                    .execute('GetMyCustoms');

                return result as unknown as MyCustomQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetMyCustoms;
