import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/OaSetting/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ZaloOaField } from '@src/dataStruct/zalo';

const initialState: state_props = {
    isLoading: false,
    toastMessage: {
        data: { type: undefined, message: '' },
    },
    delDialog: {
        isShow: false,
    },
    dialogLoading: {
        isShow: false,
    },
    zaloOa: undefined,
};

const OaSettingSlice = createSlice({
    name: 'OaSettingSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
        setIsShow_delDialog: (state, action: PayloadAction<boolean>) => {
            state.delDialog.isShow = action.payload;
        },
        setShow_dialogLoading: (state, action: PayloadAction<boolean>) => {
            state.dialogLoading.isShow = action.payload;
        },
        set_zaloOa: (state, action: PayloadAction<ZaloOaField>) => {
            state.zaloOa = action.payload;
        },
    },
});

export const { set_isLoading, setData_toastMessage, setIsShow_delDialog, setShow_dialogLoading, set_zaloOa } =
    OaSettingSlice.actions;
export default OaSettingSlice.reducer;
