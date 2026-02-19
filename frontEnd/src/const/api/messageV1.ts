import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MESSAGEV1_API = {
    GET_MESSAGES_FOR_CHAT_SCREEN: `${BASE_URL}${apiString}/service_message_v1/query/getMessagesForChatScreen`,
    GET_LAST_MESSAGE: `${BASE_URL}${apiString}/service_message_v1/query/getLastMessage`,
    GET_MESSAGE_WITH_ID: `${BASE_URL}${apiString}/service_message_v1/query/getMessageWithId`,
    CREATE_MESSAGEV1: `${BASE_URL}${apiString}/service_message_v1/mutate/createMessageV1`,
};
