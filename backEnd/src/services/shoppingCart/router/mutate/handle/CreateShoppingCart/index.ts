import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { CreateShoppingCartBodyField, ShoppingCartField } from '@src/dataStruct/shoppingCart';
import { verifyRefreshToken } from '@src/token';
import MutateDB_CreateShoppingCart from '../../mutateDB/CreateShoppingCart';
// import { produceTask } from '@src/queueRedis/producer';

class Handle_CreateShoppingCart {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (
        req: Request<Record<string, never>, unknown, CreateShoppingCartBodyField>,
        res: Response,
        next: NextFunction
    ) => {
        const myResponse: MyResponse<ShoppingCartField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const createShoppingCartBody = req.body;
        const { refreshToken } = req.cookies;

        if (typeof refreshToken === 'string') {
            const verify_refreshToken = verifyRefreshToken(refreshToken);

            if (verify_refreshToken === 'invalid') {
                myResponse.message = 'Refresh-Token không hợp lệ, hãy đăng nhập lại !';
                res.status(500).json(myResponse);
                return;
            }

            if (verify_refreshToken === 'expired') {
                myResponse.message = 'Refresh-Token hết hạn, hãy đăng nhập lại !';
                res.status(500).json(myResponse);
                return;
            }

            const { id } = verify_refreshToken;
            const newShoppingCartBody_cp = { ...createShoppingCartBody };
            newShoppingCartBody_cp.accountId = id;
            res.locals.createShoppingCartBody = newShoppingCartBody_cp;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (_: Request, res: Response) => {
        const createShoppingCartBody = res.locals.createShoppingCartBody as CreateShoppingCartBodyField;

        const myResponse: MyResponse<ShoppingCartField> = {
            isSuccess: false,
        };

        const mutateDB_createShoppingCart = new MutateDB_CreateShoppingCart();
        mutateDB_createShoppingCart.set_createShoppingCartBody(createShoppingCartBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_createShoppingCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await mutateDB_createShoppingCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0];
                // produceTask<OrderField>('addOrder-to-provider', data);
                myResponse.message = 'Tạo giỏ hàng thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Tạo giỏ hàng KHÔNG thành công !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Tạo giỏ hàng KHÔNG thành công !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateShoppingCart;
