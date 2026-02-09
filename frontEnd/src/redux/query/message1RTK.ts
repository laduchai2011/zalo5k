import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMessageV1Field } from '@src/dataStruct/message_v1';
import { MessageV1BodyField } from '@src/dataStruct/message_v1/body';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { MESSAGE1_API } from '@src/const/api/message1';
import { MyResponse } from '@src/dataStruct/response';

export const message1RTK = createApi({
    reducerPath: 'message1RTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMessagesForChatScreen: builder.query<MyResponse<PagedMessageV1Field<ZaloMessageType>>, MessageV1BodyField>({
            query: (body) => ({
                url: MESSAGE1_API.GET_MESSAGES_FOR_CHAT_SCREEN,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMessagesForChatScreenQuery, useLazyGetMessagesForChatScreenQuery } = message1RTK;
