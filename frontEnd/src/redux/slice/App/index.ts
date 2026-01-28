import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/App/type';
import { AccountInformationField } from '@src/dataStruct/account';

const initialState: state_props = {
    id_isNewMessage_current: -1, // bỏ
    accountInformation: undefined,
    myAdmin: undefined,
};

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
        set_id_isNewMessage_current: (state, action: PayloadAction<number>) => {
            state.id_isNewMessage_current = action.payload;
        },
        set_accountInformation: (state, action: PayloadAction<AccountInformationField>) => {
            state.accountInformation = action.payload;
        },
        set_myAdmin: (state, action: PayloadAction<number>) => {
            state.myAdmin = action.payload;
        },
    },
});

export const { set_id_isNewMessage_current, set_accountInformation, set_myAdmin } = AppSlice.actions;
export default AppSlice.reducer;
