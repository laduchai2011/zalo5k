import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Message1/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ChatRoomField } from '@src/dataStruct/chatRoom';

const initialState: state_props = {
    isLoading: false,
    toastMessage: {
        data: { type: undefined, message: '' },
    },
    chatRoom: undefined,
};

const Message1Slice = createSlice({
    name: 'Message1Slice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
        setData_chatRoom: (state, action: PayloadAction<ChatRoomField>) => {
            state.chatRoom = action.payload;
        },
    },
});

export const { set_isLoading, setData_toastMessage, setData_chatRoom } = Message1Slice.actions;
export default Message1Slice.reducer;
