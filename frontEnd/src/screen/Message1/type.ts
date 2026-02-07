import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ChatRoomField } from '@src/dataStruct/chatRoom';

export interface state_props {
    isLoading: boolean;
    toastMessage: {
        data: ToastMessage_Data_Props;
    };
    chatRoom?: ChatRoomField;
}
