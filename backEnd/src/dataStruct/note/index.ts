export interface NoteField {
    id: number;
    note: string;
    status: string;
    customerId: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface NoteBodyField {
    page: number;
    size: number;
    customerId: number;
    accountId: number;
}

export interface PagedNoteField {
    items: NoteField[];
    totalCount: number;
}

export interface CreateNoteBodyField {
    note: string;
    customerId: number;
    accountId: number;
}
