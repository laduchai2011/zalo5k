export interface ZaloAppField {
    id: number;
    label: string;
    appId: string;
    appName: string;
    appSecret: string;
    status: string;
    accountId: string;
    updateTime: string;
    createTime: string;
}

export interface ZaloOaField {
    id: number;
    label: string;
    oaId: string;
    oaName: string;
    oaSecret: string;
    refreshToken: string;
    status: string;
    zaloAppId: string;
    accountId: string;
    updateTime: string;
    createTime: string;
}

export interface OaPermissionField {
    id: number;
    role: string;
    status: string;
    zaloOaId: string;
    accountId: string;
    updateTime: string;
    createTime: string;
}
