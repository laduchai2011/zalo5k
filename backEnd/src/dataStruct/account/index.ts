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

export interface AccountInformationField {
    addedById: number;
    accountType: string;
    accountId: number;
}

export interface AddMemberBodyField {
    userName: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    addedById: number;
}

export interface AllMembersBodyField {
    addedById: number;
}
