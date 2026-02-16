import { configureStore } from '@reduxjs/toolkit';
import AppReducer from '@src/redux/slice/App';
import Home1Reducer from '@src/redux/slice/Home1';
import MessageReducer from '@src/redux/slice/Message';
import MessageV1Reducer from '@src/redux/slice/MessageV1';
import ManageMembersReducer from '@src/redux/slice/ManageMembers';
import MemberReceiveMessageReducer from '@src/redux/slice/MemberReceiveMessage';
import OaReducer from '@src/redux/slice/Oa';
import OaSettingReducer from '@src/redux/slice/OaSetting';
import { accountRTK } from './query/accountRTK';
import { myCustomerRTK } from './query/myCustomerRTK';
import { messageRTK } from './query/messageRTK';
import { messageV1RTK } from './query/messageV1RTK';
import { zaloRTK } from './query/zaloRTK';
import { chatSessionRTK } from './query/chatSessionRTK';
import { chatRoomRTK } from './query/chatRoomRTK';

export const store = configureStore({
    reducer: {
        dummy: (state = {}) => state,
        AppSlice: AppReducer,
        Home1Slice: Home1Reducer,
        MessageSlice: MessageReducer,
        MessageV1Slice: MessageV1Reducer,
        ManageMembersSlice: ManageMembersReducer,
        MemberReceiveMessageSlice: MemberReceiveMessageReducer,
        OaSlice: OaReducer,
        OaSettingSlice: OaSettingReducer,
        [accountRTK.reducerPath]: accountRTK.reducer,
        [myCustomerRTK.reducerPath]: myCustomerRTK.reducer,
        [messageRTK.reducerPath]: messageRTK.reducer,
        [messageV1RTK.reducerPath]: messageV1RTK.reducer,
        [zaloRTK.reducerPath]: zaloRTK.reducer,
        [chatSessionRTK.reducerPath]: chatSessionRTK.reducer,
        [chatRoomRTK.reducerPath]: chatRoomRTK.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            accountRTK.middleware,
            myCustomerRTK.middleware,
            messageRTK.middleware,
            messageV1RTK.middleware,
            zaloRTK.middleware,
            chatSessionRTK.middleware,
            chatRoomRTK.middleware
        ),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
