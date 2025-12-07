import dotenv from 'dotenv';

dotenv.config();

const isProduct = process.env.NODE_ENV === 'production';

export const redisKey_storeTokenZalo = isProduct ? 'redisKey_storeTokenZalo' : 'redisKey_storeTokenZalo_dev';
export const redisKey_storeTokenZalo_lock = isProduct
    ? 'redisKey_storeTokenZalo_lock'
    : 'redisKey_storeTokenZalo_lock_dev';
