export interface CreateAgentBodyField {
    accountId: number;
}

export interface AgentAddAccountBodyField {
    id: number;
    agentAccountId: number;
    accountId: number;
}

export interface GetAgentsBodyField {
    page: number;
    size: number;
    offset: number;
    accountId: number;
}
