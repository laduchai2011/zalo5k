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

export interface IsMyOaBodyField {
    id: number;
    accountId: number;
}

export interface ZaloOaWithIdBodyField {
    id: number;
    accountId: number;
}

export interface CheckZaloAppWithAppIdBodyField {
    appId: string;
}

export interface CheckZaloOaListWithZaloAppIdBodyField {
    zaloAppId: number;
}
