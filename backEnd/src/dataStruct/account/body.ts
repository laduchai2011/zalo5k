export interface GetReplyAccountBodyField {
    page: number;
    size: number;
    chatRoomId: number;
}

export interface GetNotReplyAccountBodyField {
    page: number;
    size: number;
    chatRoomId: number;
    accountId: number;
}
