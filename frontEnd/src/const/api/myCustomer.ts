import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MYCUSTOMER_API = {
    GET_MYCUSTOMERS: `${BASE_URL}${apiString}/service_myCustomer/query/getMyCustomers`,
};
