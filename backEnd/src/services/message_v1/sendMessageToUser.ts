import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '@src/zaloToken';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { HookDataBodyField } from '@src/dataStruct/zalo/hookData/body';

export async function sendMessageToUser(zaloApp: ZaloAppField, zaloOa: ZaloOaField, payload: HookDataBodyField) {
    try {
        let newAccessToken: string | undefined = undefined;
        newAccessToken = await getAccessToken(zaloOa);
        if (!newAccessToken) {
            newAccessToken = await refreshAccessToken(zaloApp, zaloOa, 10);
        }

        const result = await axios.post<any>('https://openapi.zalo.me/v3.0/oa/message/cs', payload, {
            headers: {
                access_token: newAccessToken,
                'Content-Type': 'application/json',
            },
        });
        // console.log('result', result.data);
        if (result?.data.error !== 0) {
            const newAccessToken = await refreshAccessToken(zaloApp, zaloOa, 10);
            if (!newAccessToken) {
                console.error('sendMessageToUser', 'Could not refresh Zalo access token');
                return;
            }

            const result1 = await axios.post('https://openapi.zalo.me/v3.0/oa/message/cs', payload, {
                headers: {
                    access_token: newAccessToken,
                    'Content-Type': 'application/json',
                },
            });

            // console.log('result1', result.data);
            return result1;
        }
        return result;
    } catch (err: any) {
        // Nếu lỗi hết hạn token
        console.error(err);

        if (err.response?.data?.message === 'Access token has expired') {
            const newAccessToken = await refreshAccessToken(zaloApp, zaloOa, 10);
            if (!newAccessToken) {
                console.error('sendMessageToUser', 'Failed to refresh token in Redis');
                return;
            }

            return await axios.post('https://openapi.zalo.me/v3.0/oa/message/cs', payload, {
                headers: {
                    access_token: newAccessToken,
                    'Content-Type': 'application/json',
                },
            });
        }
    }
}
