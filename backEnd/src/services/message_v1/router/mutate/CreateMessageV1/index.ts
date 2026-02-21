import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { sendMessageToUser } from '@src/services/message_v1/sendMessageToUser';
import { CreateMessageV1BodyField } from '@src/dataStruct/message_v1/body';
import { ResultSendToZaloField } from '@src/dataStruct/zalo/hookData';

class Handle_CreateMessageV1 {
    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, CreateMessageV1BodyField>, res: Response) => {
        const createMessageV1Body = req.body;
        const zaloApp = createMessageV1Body.zaloApp;
        const zaloOa = createMessageV1Body.zaloOa;
        const payload = createMessageV1Body.payload;

        const myResponse: MyResponse<ResultSendToZaloField> = {
            isSuccess: false,
            message: 'Bắt đầu (Handle_CreateMessageV1-main)',
        };

        const result = await sendMessageToUser(zaloApp, zaloOa, payload);

        if (result?.message === 'Success') {
            myResponse.data = result;
            myResponse.message = 'Gửi tin thành công !';
            myResponse.isSuccess = true;
            res.status(200).json(myResponse);
            return;
        } else {
            myResponse.message = 'Gửi tin không thành công !';
            res.status(200).json(myResponse);
            return;
        }
    };
}

export default Handle_CreateMessageV1;
