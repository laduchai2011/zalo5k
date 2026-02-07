export interface ChatRoomBodyField {
    userIdByApp: string;
    zaloOaId: number;
    accountId: number;
}

export interface UserTakeRoomToChatBodyField {
    userIdByApp: string;
    zaloOaId: number;
}

export interface GetChatRoomWithIdBodyField {
    id: number;
}

export interface ChatRoomRoleWithCridAaidBodyField {
    authorizedAccountId: number;
    chatRoomId: number;
}
