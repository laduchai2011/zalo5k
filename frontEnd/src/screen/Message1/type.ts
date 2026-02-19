import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ChatRoomField } from '@src/dataStruct/chatRoom';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { SocketType } from '@src/dataStruct/socketIO';

export interface state_props {
    isLoading: boolean;
    toastMessage: {
        data: ToastMessage_Data_Props;
    };
    chatRoom?: ChatRoomField;
    zaloOa?: ZaloOaField;
    socket?: SocketType;
}
