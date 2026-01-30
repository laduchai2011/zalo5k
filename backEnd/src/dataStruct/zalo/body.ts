export interface ZaloAppWithAccountIdBodyField {
    accountId: number;
    role: string;
}

export interface ZaloOaListWith2FkBodyField {
    page: number;
    size: number;
    zaloAppId: number;
    accountId: number;
}
