import sql from 'mssql';
import { QueryDB } from '@src/services/shoppingCart/interface';
import { ShoppingCartField, ShoppingCartBodyField } from '@src/dataStruct/shoppingCart';

class QueryDB_GetAllShoppingCarts extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _shoppingCartBody: ShoppingCartBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setShoppingCartBody(shoppingCartBody: ShoppingCartBodyField): void {
        this._shoppingCartBody = shoppingCartBody;
    }

    async run(): Promise<sql.IProcedureResult<ShoppingCartField[]> | void> {
        if (this._connectionPool !== undefined && this._shoppingCartBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('accountId', sql.Int, this._shoppingCartBody.accountId)
                    .execute('GetAllShoppingCarts');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_GetAllShoppingCarts;
