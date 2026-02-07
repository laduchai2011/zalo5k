import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatRoomField } from '@src/dataStruct/chatRoom';
import { GetChatRoomWithIdBodyField } from '@src/dataStruct/chatRoom/body';
import { CHAT_ROOM_API } from '@src/const/api/chatRoom';
import { MyResponse } from '@src/dataStruct/response';

export const chatRoomRTK = createApi({
    reducerPath: 'chatRoomRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getChatRoomsWithId: builder.query<MyResponse<ChatRoomField>, GetChatRoomWithIdBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.GET_CHAT_ROOM_WITH_ID,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetChatRoomsWithIdQuery } = chatRoomRTK;
