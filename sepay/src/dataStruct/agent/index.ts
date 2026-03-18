export interface AgentField {
    id: number;
    type: string;
    expiry: string;
    status: string;
    agentAccountId: number | null;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedAgentField {
    items: AgentField[];
    totalCount: number;
}
