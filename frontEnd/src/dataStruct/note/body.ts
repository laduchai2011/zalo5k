export interface CreateNoteBodyField {
    note: string;
    chatRoomId: number;
    zaloOaId: number;
    accountId: number;
}

export interface GetNotesBodyField {
    page: number;
    size: number;
    offset: number;
    chatRoomId?: number;
    zaloOaId?: number;
    accountId: number;
}
