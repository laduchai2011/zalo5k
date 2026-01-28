import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';

export interface state_props {
    toastMessage: {
        data: ToastMessage_Data_Props;
    };
    delDialog: {
        isShow: boolean;
    };
    dialogLoading: {
        isShow: boolean;
    };
}
