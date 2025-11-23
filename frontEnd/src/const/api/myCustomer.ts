import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MYCUSTOMER_API = {
    GET_MY_CUSTOMERS: `${BASE_URL}${apiString}/service_myCustomer/query/getMyCustomers`,
    GET_INFOR_CUSTOMER_ON_ZALO: `${BASE_URL}${apiString}/service_myCustomer/query/getInforCustomerOnZalo`,
};
