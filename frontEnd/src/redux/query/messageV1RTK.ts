import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMessageV1Field } from '@src/dataStruct/message_v1';
import { MessageV1BodyField, CreateMessageV1BodyField } from '@src/dataStruct/message_v1/body';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { MESSAGEV1_API } from '@src/const/api/messageV1';
import { MyResponse } from '@src/dataStruct/response';
import { ResultSendToZaloField } from '@src/dataStruct/zalo/hookData';

export const message1RTK = createApi({
    reducerPath: 'message1RTK',
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
        createMessageV1: builder.query<MyResponse<ResultSendToZaloField>, CreateMessageV1BodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.CREATE_MESSAGEV1,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMessagesForChatScreenQuery, useLazyGetMessagesForChatScreenQuery } = message1RTK;
