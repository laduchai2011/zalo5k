export interface MessageField {
    id: number;
    eventName: string;
    senserId: string;
    message: string;
    timestamp: string;
    messageStatus: string;
    status: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface MessageBodyField {
    page: number;
    size: number;
    accountId?: number;
}

export interface PagedMessageField {
    items: MessageField[];
    totalCount: number;
}
