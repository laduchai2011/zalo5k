import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Message/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';

const initialState: state_props = {
    toastMessage: {
        data: { type: undefined, message: '' },
    },
};

const MessageSlice = createSlice({
    name: 'MessageSlice',
    initialState,
    reducers: {
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
    },
});

export const { setData_toastMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
