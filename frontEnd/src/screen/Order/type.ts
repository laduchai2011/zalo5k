import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { OrderField, OrderStatusField } from '@src/dataStruct/order';

export interface state_props {
    isLoading: boolean;
    toastMessage: {
        data: ToastMessage_Data_Props;
    };
    selectedOa?: ZaloOaField;
    editOrderDialog: {
        isShow: boolean;
        order?: OrderField;
        newOrder?: OrderField;
    };
    payDialog: {
        isShow: boolean;
    };
    addOrderStatusDialog: {
        isShow: boolean;
        order?: OrderField;
        newOrderStatus?: OrderStatusField;
        defaultOption?: orderStatus_type;
    };
}

export enum orderStatus_enum {
    FREEDOM = 'freedom',
    DEFAULT = 'default',
}

export type orderStatus_type = orderStatus_enum.FREEDOM | orderStatus_enum.DEFAULT;

export enum defaultSelections {
    NOT_PAY = 'not_pay',
    PAID = 'paid',
    NOT_SEND = 'not_send',
    SENT = 'sent',
    RETURN = 'return',
}
