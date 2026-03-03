import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { OrderField } from '@src/dataStruct/order';

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
}
