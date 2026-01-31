import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatSessionField, PagedChatSessionField } from '@src/dataStruct/chatSession';
import { ChatSessionWithAccountIdBodyField, ChatSessionBodyField } from '@src/dataStruct/chatSession/body';
import { CHAT_SESSION_API } from '@src/const/api/chatSession';
import { MyResponse } from '@src/dataStruct/response';

export const chatSessionRTK = createApi({
    reducerPath: 'chatSessionRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: ['ChatSessionList'],
    endpoints: (builder) => ({
        getChatSessionsWithAccountId: builder.query<
            MyResponse<PagedChatSessionField>,
            ChatSessionWithAccountIdBodyField
        >({
            query: (body) => ({
                url: CHAT_SESSION_API.GET_CHAT_SESSION_WITH_ACCOUNT_ID,
                method: 'POST',
                body,
            }),
            providesTags: ['ChatSessionList'],
        }),
        createChatSession: builder.mutation<MyResponse<ChatSessionField>, ChatSessionBodyField>({
            query: (body) => ({
                url: CHAT_SESSION_API.CREATE_CHAT_SESSION,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ChatSessionList'],
        }),
    }),
});

export const { useCreateChatSessionMutation, useGetChatSessionsWithAccountIdQuery } = chatSessionRTK;
