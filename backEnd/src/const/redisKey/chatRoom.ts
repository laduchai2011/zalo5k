import dotenv from 'dotenv';

dotenv.config();

const isProduct = process.env.NODE_ENV === 'production';

export const prefix_cache_chatRoom_with_id = isProduct
    ? 'prefix_cache_chatRoom_with_id'
    : 'prefix_cache_chatRoom_with_id_dev';
