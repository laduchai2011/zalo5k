export interface ChatRoomField {
    id: number;
    userIdByApp: string;
    status: string;
    zaloOaId: number;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedChatRoomField {
    items: ChatRoomField[];
    totalCount: number;
}
