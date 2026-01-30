import { configureStore } from '@reduxjs/toolkit';
import AppReducer from '@src/redux/slice/App';
import MessageReducer from '@src/redux/slice/Message';
import ManageMembersReducer from '@src/redux/slice/ManageMembers';
import MemberReceiveMessageReducer from '@src/redux/slice/MemberReceiveMessage';
import OaReducer from '@src/redux/slice/Oa';
import OaSettingReducer from '@src/redux/slice/OaSetting';
import { accountRTK } from './query/accountRTK';
import { myCustomerRTK } from './query/myCustomerRTK';
import { messageRTK } from './query/messageRTK';
import { zaloRTK } from './query/zaloRTK';
import { chatSessionRTK } from './query/chatSessionRTK';

export const store = configureStore({
    reducer: {
        dummy: (state = {}) => state,
        AppSlice: AppReducer,
        MessageSlice: MessageReducer,
        ManageMembersSlice: ManageMembersReducer,
        MemberReceiveMessageSlice: MemberReceiveMessageReducer,
        OaSlice: OaReducer,
        OaSettingSlice: OaSettingReducer,
        [accountRTK.reducerPath]: accountRTK.reducer,
        [myCustomerRTK.reducerPath]: myCustomerRTK.reducer,
        [messageRTK.reducerPath]: messageRTK.reducer,
        [zaloRTK.reducerPath]: zaloRTK.reducer,
        [chatSessionRTK.reducerPath]: chatSessionRTK.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            accountRTK.middleware,
            myCustomerRTK.middleware,
            messageRTK.middleware,
            zaloRTK.middleware,
            chatSessionRTK.middleware
        ),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
