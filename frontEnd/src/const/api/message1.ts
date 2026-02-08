import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MESSAGE1_API = {
    GET_MESSAGES_FOR_CHAT_SCREEN: `${BASE_URL}${apiString}/service_message_v1/query/getMessagesForChatScreen`,
};
