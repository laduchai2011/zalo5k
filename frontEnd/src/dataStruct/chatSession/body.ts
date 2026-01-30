export interface ChatSessionBodyField {
    label: string;
    code: string;
    isReady: boolean;
    selectedAccountId: number;
    accountId: number;
}

export interface ChatSessionWithAccountIdBodyField {
    page: number;
    size: number;
    accountId: number;
}
