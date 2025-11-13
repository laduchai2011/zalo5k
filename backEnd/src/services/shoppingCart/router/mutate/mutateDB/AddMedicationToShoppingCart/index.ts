import sql from 'mssql';
import { MutateDB } from '@src/services/shoppingCart/interface';
import { ShoppingCartMedicationField, CreateShoppingCartMedicationBodyField } from '@src/dataStruct/shoppingCart';

class MutateDB_AddMedicationToShoppingCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createShoppingCartMedicationBody: CreateShoppingCartMedicationBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_createShoppingCartMedicationBody(
        createShoppingCartMedicationBody: CreateShoppingCartMedicationBodyField
    ): void {
        this._createShoppingCartMedicationBody = createShoppingCartMedicationBody;
    }

    async run(): Promise<sql.IProcedureResult<ShoppingCartMedicationField> | undefined> {
        if (this._connectionPool !== undefined && this._createShoppingCartMedicationBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('amount', sql.Int, this._createShoppingCartMedicationBody.amount)
                    .input('discount', sql.Int, this._createShoppingCartMedicationBody.discount)
                    .input('price', sql.Int, this._createShoppingCartMedicationBody.price)
                    .input('medicationId', sql.Int, this._createShoppingCartMedicationBody.medicationId)
                    .input('shoppingCartId', sql.Int, this._createShoppingCartMedicationBody.shoppingCartId)
                    .execute('AddMedicationToShoppingCart');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_AddMedicationToShoppingCart;
