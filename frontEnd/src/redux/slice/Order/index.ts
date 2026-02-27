import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Order/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { ZaloOaField } from '@src/dataStruct/zalo';

const initialState: state_props = {
    isLoading: false,
    toastMessage: {
        data: { type: undefined, message: '' },
    },
    selectedOa: undefined,
    editOrderDialog: {
        isShow: false,
    },
};

const OrderSlice = createSlice({
    name: 'OrderSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
        set_selectedOa: (state, action: PayloadAction<ZaloOaField>) => {
            state.selectedOa = action.payload;
        },
        setIsShow_editOrderDialog: (state, action: PayloadAction<boolean>) => {
            state.editOrderDialog.isShow = action.payload;
        },
    },
});

export const { set_isLoading, setData_toastMessage, set_selectedOa, setIsShow_editOrderDialog } = OrderSlice.actions;
export default OrderSlice.reducer;
