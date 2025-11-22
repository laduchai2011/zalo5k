export interface MyCustomField {
    id: number;
    senderId: string;
    status: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface MyCustomBodyField {
    page: number;
    size: number;
    accountId?: number;
}

export interface PagedMyCustomField {
    items: MyCustomField[];
    totalCount: number;
}
