export interface AccountField {
    id: number;
    userName: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    status: string;
    updateTime: string;
    createTime: string;
}

export interface AddMemberBodyField {
    userName: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    addedById: number;
}
