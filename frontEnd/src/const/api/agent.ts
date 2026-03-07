import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const AGENT_API = {
    GET_AGENTS: `${BASE_URL}${apiString}/service_agent/query/getAgents`,
    CREATE_AGENT: `${BASE_URL}${apiString}/service_agent/mutate/createAgent`,
    AGENT_ADD_ACCOUNT: `${BASE_URL}${apiString}/service_agent/mutate/agentAddAccount`,
};
