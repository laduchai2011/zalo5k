export interface ChatSessionBodyField {
    label: string;
    code: string;
    isReady: boolean;
    selectedAccountId: number;
    zaloOaId: number;
    accountId: number;
}

export interface ChatSessionWithAccountIdBodyField {
    page: number;
    size: number;
    zaloOaId: number;
    accountId: number;
}
