import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const ACCOUNT_API = {
    SIGNUP: `${BASE_URL}${apiString}/service_account/mutate/signup`,
    SIGNIN: `${BASE_URL}${apiString}/service_account/mutate/signin`,
    SIGNOUT: `${BASE_URL}${apiString}/service_account/mutate/signout`,
    ADD_MEMBER: `${BASE_URL}${apiString}/service_account/mutate/addMember`,
    GET_ALL_MEMBERS: `${BASE_URL}${apiString}/service_account/query/getAllMembers`,
    SET_MEMBER_RECEIVE_MESSAGE: `${BASE_URL}${apiString}/service_account/mutate/setMemberReceiveMessage`,
    GET_MEMBER_RECEIVE_MESSAGE: `${BASE_URL}${apiString}/service_account/query/getMemberReceiveMessage`,
    GET_ACCOUNT_WITH_ID: `${BASE_URL}${apiString}/service_account/query/getAccountWithId`,
};
