import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ShoppingCartField, ShoppingCartBodyField } from '@src/dataStruct/shoppingCart';
import QueryDB_GetAllShoppingCarts from '../../queryDB/GetAllShoppingCarts';
import { verifyRefreshToken } from '@src/token';

class Handle_GetAllShoppingCarts {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<unknown, unknown, ShoppingCartBodyField>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<ShoppingCartField> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const shoppingCartBody = req.body;
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
            const shoppingCartBody_cp = { ...shoppingCartBody };
            shoppingCartBody_cp.accountId = id;
            res.locals.shoppingCartBody = shoppingCartBody_cp;
            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            res.status(500).json(myResponse);
            return;
        }
    };

    main = async (req: Request<unknown, unknown, ShoppingCartBodyField>, res: Response) => {
        const shoppingCartBody = res.locals.shoppingCartBody as ShoppingCartBodyField;

        const myResponse: MyResponse<ShoppingCartField[]> = {
            isSuccess: false,
        };

        await this._mssql_server.init();

        const queryDB_getAllShoppingCarts = new QueryDB_GetAllShoppingCarts();
        queryDB_getAllShoppingCarts.setShoppingCartBody(shoppingCartBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_getAllShoppingCarts.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            res.status(500).json(myResponse);
            return;
        }

        try {
            const result = await queryDB_getAllShoppingCarts.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.data = result?.recordset;
                myResponse.message = 'Lấy tất cả giỏ hàng thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy tất cả giỏ hàng KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy tất cả giỏ hàng KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetAllShoppingCarts;
