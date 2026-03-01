import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const ORDER_API = {
    CREATE_ORDER: `${BASE_URL}${apiString}/service_order/mutate/createOrder`,
};
