import ServiceRedis from '@src/cache/cacheRedis';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { ZaloUserField } from '@src/dataStruct/zalo/user';
import QueryDB_GetZaloUserInfor from '../../queryZalo/GetZaloUserInfor';
import { ZaloUserBodyField } from '@src/dataStruct/zalo/user/body';
import { prefix_cache_zaloUser } from '@src/const/redisKey/zalo';

class Handle_GetZaloUserInfor {
    private _serviceRedis = ServiceRedis.getInstance();

    constructor() {
        this._serviceRedis.init();
    }

    main = async (req: Request<any, any, ZaloUserBodyField>, res: Response) => {
        const zaloUserBody: ZaloUserBodyField = req.body;
        const zaloApp = zaloUserBody.zaloApp;
        const userIdByApp = zaloUserBody.userIdByApp;

        const myResponse: MyResponse<ZaloUserField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_GetZaloUserInfor-main) !',
        };

        const keyRedis = `${prefix_cache_zaloUser.key.with_zaloAppId_userIdByApp}_${zaloApp.id}_${userIdByApp}`;
        const timeExpireat = prefix_cache_zaloUser.time;

        const zaloUser_redis = await this._serviceRedis.getData<ZaloUserField>(keyRedis);
        if (zaloUser_redis) {
            myResponse.data = zaloUser_redis;
            myResponse.message = 'Lấy thông tin zaloUser thành công !';
            myResponse.isSuccess = true;
            res.status(200).json(myResponse);
            return;
        }

        const queryDB = new QueryDB_GetZaloUserInfor();
        queryDB.setZaloUserBody(zaloUserBody);

        try {
            const result = await queryDB.run();
            if (result) {
                const isSet = await this._serviceRedis.setData<ZaloUserField>(keyRedis, result, timeExpireat);
                if (!isSet) {
                    console.error('Failed to set zaloUser in Redis', keyRedis);
                }

                myResponse.data = result;
                myResponse.message = 'Lấy thông tin zaloUserInfor thành công !';
                myResponse.isSuccess = true;
                res.status(200).json(myResponse);
                return;
            } else {
                myResponse.message = 'Lấy thông tin zaloUserInfor KHÔNG thành công !';
                res.status(204).json(myResponse);
                return;
            }
        } catch (error) {
            myResponse.message = 'Lấy thông tin zaloUserInfor KHÔNG thành công !!';
            myResponse.err = error;
            res.status(500).json(myResponse);
            return;
        }
    };
}

export default Handle_GetZaloUserInfor;
