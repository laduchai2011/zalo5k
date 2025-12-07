import dotenv from 'dotenv';

dotenv.config();

const isProduct = process.env.NODE_ENV === 'production';

export const redisKey_memberReceiveMessage = isProduct
    ? 'redisKey_memberReceiveMessage'
    : 'redisKey_memberReceiveMessage_dev';
