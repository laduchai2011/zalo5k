import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    id_isNewMessage_current: -1,
};

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
        set_id_isNewMessage_current: (state, action: PayloadAction<number>) => {
            state.id_isNewMessage_current = action.payload;
        },
    },
});

export const { set_id_isNewMessage_current } = AppSlice.actions;
export default AppSlice.reducer;
