export interface OrdersFilterBodyField {
    page: number;
    size: number;
    uuid: string;
    moneyFrom: number;
    moneyTo: number;
    isPay: boolean;
    phone: string;
    chatRoomId: number;
    accountId: number;
}

export interface CreateOrderBodyField {
    uuid: string;
    label: string;
    content: string;
    money: number;
    phone: string;
    chatRoomId: number;
    accountId: number;
}

export interface UpdateOrderBodyField {
    id: number;
    label: string;
    content: string;
    money: number;
    phone: string;
    accountId: number;
}
