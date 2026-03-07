export interface CreateAgentBodyField {
    accountId: number;
}

export interface AgentAddAccountBodyField {
    agentAccountId: number;
    accountId: number;
}

export interface GetAgentsBodyField {
    page: number;
    size: number;
    accountId: number;
}
