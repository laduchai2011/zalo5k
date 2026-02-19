import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMessageV1Field, MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageV1BodyField, CreateMessageV1BodyField } from '@src/dataStruct/message_v1/body';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { MESSAGEV1_API } from '@src/const/api/messageV1';
import { MyResponse } from '@src/dataStruct/response';
import { ResultSendToZaloField } from '@src/dataStruct/zalo/hookData';

export const messageV1RTK = createApi({
    reducerPath: 'messageV1RTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMessagesForChatScreen: builder.query<MyResponse<PagedMessageV1Field<ZaloMessageType>>, MessageV1BodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.GET_MESSAGES_FOR_CHAT_SCREEN,
                method: 'POST',
                body,
            }),
        }),
        getLastMessage: builder.query<MyResponse<MessageV1Field<ZaloMessageType>>, { chatRoomId: string }>({
            query: ({ chatRoomId }) => `${MESSAGEV1_API.GET_LAST_MESSAGE}?chatRoomId=${chatRoomId}`,
        }),
        getMessageWithId: builder.query<MyResponse<MessageV1Field<ZaloMessageType>>, { id: string }>({
            query: ({ id }) => `${MESSAGEV1_API.GET_MESSAGE_WITH_ID}?id=${id}`,
        }),
        createMessageV1: builder.mutation<MyResponse<ResultSendToZaloField>, CreateMessageV1BodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.CREATE_MESSAGEV1,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetMessagesForChatScreenQuery,
    useGetLastMessageQuery,
    useLazyGetMessageWithIdQuery,
    useCreateMessageV1Mutation,
} = messageV1RTK;
