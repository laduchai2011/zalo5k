import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMessageField, MessageBodyField } from '@src/dataStruct/message';
import { MESSAGE_API } from '@src/const/api/message';
import { MyResponse } from '@src/dataStruct/response';

export const messageRTK = createApi({
    reducerPath: 'messageRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMessages: builder.query<MyResponse<PagedMessageField>, MessageBodyField>({
            query: (body) => ({
                url: MESSAGE_API.GET_MESSAGES,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMessagesQuery } = messageRTK;
