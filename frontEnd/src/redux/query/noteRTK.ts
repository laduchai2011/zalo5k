import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    PagedNoteField,
    NoteBodyField,
    // MessagesHasFilterBodyField,
    NoteField,
    CreateNoteBodyField,
    // UpdateMessageStatusBodyField,
} from '@src/dataStruct/note';
import { NOTE_API } from '@src/const/api/note';
import { MyResponse } from '@src/dataStruct/response';

export const noteRTK = createApi({
    reducerPath: 'noteRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getNotes: builder.query<MyResponse<PagedNoteField>, NoteBodyField>({
            query: (body) => ({
                url: NOTE_API.GET_NOTES,
                method: 'POST',
                body,
            }),
        }),
        // getMessagesHasFilter: builder.query<MyResponse<PagedMessageField>, MessagesHasFilterBodyField>({
        //     query: (body) => ({
        //         url: MESSAGE_API.GET_MESSAGES_HAS_FILTER,
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        createNote: builder.mutation<MyResponse<NoteField>, CreateNoteBodyField>({
            query: (body) => ({
                url: NOTE_API.CREATE_NOTE,
                method: 'POST',
                body,
            }),
            // invalidatesTags: ['Medication'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        // updateMessageStatus: builder.mutation<MyResponse<MessageField>, UpdateMessageStatusBodyField>({
        //     query: (body) => ({
        //         url: MESSAGE_API.UPDATE_MESSAGE_STATUS,
        //         method: 'POST',
        //         body,
        //     }),
        //     // invalidatesTags: ['Medication'], // dùng nếu muốn refetch danh sách sau khi thêm
        // }),
    }),
});

export const {
    useGetNotesQuery,
    // useGetMessagesHasFilterQuery,
    useCreateNoteMutation,
    // useUpdateMessageStatusMutation,
} = noteRTK;
