import axios from 'axios';
import qs from 'qs';
import { Lock } from 'redlock';
import { serviceRedlock } from '@src/connect';
import ServiceRedis from '@src/cache/cacheRedis';
import { TokenZaloField, TokenResField } from '@src/dataStruct/tokenZalo';
import { redisKey_storeTokenZalo, redisKey_storeTokenZalo_lock } from '@src/const/zalo';

const serviceRedis = ServiceRedis.getInstance();
serviceRedis.init();

const timeExpireat = 60 * 60 * 24 * 30 * 12;

export async function getAccessToken(): Promise<string | null> { 
    const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
    // return zaloToken?.access_token ?? null;
    if (!zaloToken) {
        console.error('getAccessToken', 'Failed to get token in Redis');
        return null;
    }

    return zaloToken.access_token;
}

export async function refreshAccessToken(): Promise<string | null> {
    let lock: Lock | null = null;

    try {
        lock = await serviceRedlock.acquire([redisKey_storeTokenZalo_lock], 30000);

        const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
        if (!zaloToken) {
            console.error('refreshAccessToken', 'Failed to get token in Redis');
            return null;
        }

        const body = qs.stringify({
            app_id: '2474292114893114248',
            grant_type: 'refresh_token',
            refresh_token: zaloToken.refresh_token,
        });

        const res = await axios.post<TokenResField>('https://oauth.zaloapp.com/v4/oa/access_token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Secret_key: '7XFkowzBCeRBRGqDhUkL',
            },
        });

        const newToken = res.data.access_token;
        const newRefresh = res.data.refresh_token;

        if (!(newToken && newRefresh)) {
            console.error('Failed to get new access token and refresh token');
            return null;
        }

        zaloToken.access_token = newToken;
        zaloToken.refresh_token = newRefresh;

        const isSet = await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, zaloToken, timeExpireat);
        if (!isSet) {
            console.error('Failed to set new token in Redis');
            return null;
        }

        return newToken;
    } catch (err: any) {
        console.error('REFRESH ERROR:', err.response?.data || err);
        return null;
    } finally {
        if (lock) {
            await lock.release();
        }
    }
}
