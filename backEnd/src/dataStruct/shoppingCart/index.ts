export interface ShoppingCartField {
    id: number;
    name: string;
    total: number;
    status: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface ShoppingCartMedicationField {
    id: number;
    amount: number;
    discount: number;
    price: number;
    status: string;
    medicationId: number;
    shoppingCartId: number;
    updateTime: string;
    createTime: string;
}

export interface CreateShoppingCartBodyField {
    name: string;
    accountId: number;
}

export interface CreateShoppingCartMedicationBodyField {
    amount: number;
    discount: number;
    price: number;
    medicationId: number;
    shoppingCartId: number;
}

export interface ShoppingCartBodyField {
    accountId: number;
}
