import sql from 'mssql';
import { MutateDB } from '@src/services/shoppingCart/interface';
import { ShoppingCartField, CreateShoppingCartBodyField } from '@src/dataStruct/shoppingCart';

class MutateDB_CreateShoppingCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createShoppingCartBody: CreateShoppingCartBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_createShoppingCartBody(createShoppingCartBody: CreateShoppingCartBodyField): void {
        this._createShoppingCartBody = createShoppingCartBody;
    }

    async run(): Promise<sql.IProcedureResult<ShoppingCartField> | undefined> {
        if (this._connectionPool !== undefined && this._createShoppingCartBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('name', sql.NVarChar(255), this._createShoppingCartBody.name)
                    .input('accountId', sql.Int, this._createShoppingCartBody.accountId)
                    .execute('CreateShoppingCart');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateShoppingCart;
