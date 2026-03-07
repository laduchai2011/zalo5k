import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/ManageAgent/type';
import { ToastMessage_Data_Props } from '@src/component/ToastMessage/type';
import { AgentField } from '@src/dataStruct/agent';

const initialState: state_props = {
    isLoading: false,
    toastMessage: {
        data: { type: undefined, message: '' },
    },
    newAgents: [],
};

const ManageAgentSlice = createSlice({
    name: 'ManageAgentSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setData_toastMessage: (state, action: PayloadAction<ToastMessage_Data_Props>) => {
            state.toastMessage.data = action.payload;
        },
        setData_addNewAgent: (state, action: PayloadAction<AgentField>) => {
            state.newAgents = [...state.newAgents, action.payload];
        },
        clear_newAgents: (state) => {
            state.newAgents = [];
        },
    },
});

export const { set_isLoading, setData_toastMessage, setData_addNewAgent, clear_newAgents } = ManageAgentSlice.actions;
export default ManageAgentSlice.reducer;
