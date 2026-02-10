export interface ChatRoomField {
    id: number;
    userIdByApp: string;
    status: string;
    zaloOaId: number;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface ChatRoomRoleField {
    id: number;
    authorizedAccountId: number;
    backGroundColor: string | null;
    isRead: boolean;
    isSend: boolean;
    status: string;
    chatRoomId: number;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedChatRoomField {
    items: ChatRoomField[];
    totalCount: number;
}
