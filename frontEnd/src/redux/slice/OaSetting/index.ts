import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/OaSetting/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';

const initialState: state_props = {
    toastMessage: {
        data: { type: undefined, message: '' },
    },
    delDialog: {
        isShow: false,
    },
    dialogLoading: {
        isShow: false,
    },
};

const OaSettingSlice = createSlice({
    name: 'OaSettingSlice',
    initialState,
    reducers: {
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
        setIsShow_delDialog: (state, action: PayloadAction<boolean>) => {
            state.delDialog.isShow = action.payload;
        },
        setShow_dialogLoading: (state, action: PayloadAction<boolean>) => {
            state.dialogLoading.isShow = action.payload;
        },
    },
});

export const { setData_toastMessage, setIsShow_delDialog, setShow_dialogLoading } = OaSettingSlice.actions;
export default OaSettingSlice.reducer;
