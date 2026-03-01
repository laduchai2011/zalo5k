export interface OrderField {
    id: number;
    uuid: string;
    label: string;
    content: string;
    money: number;
    isPay: boolean;
    phone: string;
    status: string;
    chatRoomId: number;
    zaloOaId: number;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedOrderField {
    items: OrderField[];
    totalCount: number;
}
