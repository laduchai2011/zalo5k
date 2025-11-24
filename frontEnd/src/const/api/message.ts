import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MESSAGE_API = {
    GET_MESSAGES: `${BASE_URL}${apiString}/service_message/query/getMessages`,
    CREATE_MESSAGE: `${BASE_URL}${apiString}/service_message/mutate/createMessage`,
};
