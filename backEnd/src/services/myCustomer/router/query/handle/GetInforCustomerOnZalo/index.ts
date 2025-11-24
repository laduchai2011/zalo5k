import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ZaloCustomerField } from '@src/dataStruct/hookData';
import QueryZalo_GetInforCustomerOnZalo from '../../queryDB/GetInforCustomerOnZalo';
// import ServiceRedis from '@src/cache/cacheRedis';
// import { redisKey_storeTokenZalo } from '@src/const/zalo';
// import { TokenZaloField } from '@src/dataStruct/tokenZalo';

// const serviceRedis = ServiceRedis.getInstance();

class Handle_GetInforCustomerOnZalo {
    // private _serviceRedis = serviceRedis;

    constructor() {}

    main = async (req: Request<any, any, any, { customerId: string }>, res: Response) => {
        const customerId = req.query.customerId;

        const myResponse: MyResponse<ZaloCustomerField> = {
            isSuccess: false,
        };

        // await this._serviceRedis.init();

        // const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
        // console.log('zaloToken', zaloToken);

        const queryZalo_getInforCustomerOnZalo = new QueryZalo_GetInforCustomerOnZalo();
        queryZalo_getInforCustomerOnZalo.setCustomerId(customerId);

        try {
            const result = await queryZalo_getInforCustomerOnZalo.run();
            if (result) {
                myResponse.data = result;
                myResponse.message = 'Lấy thông tin khách hàng trên ZALO thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin khách hàng trên ZALO KHÔNG thành công 1 !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin khách hàng trên ZALO KHÔNG thành công 2 !';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetInforCustomerOnZalo;
