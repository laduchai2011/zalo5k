import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NoteField, PagedNoteField } from '@src/dataStruct/note';
import { GetNotesBodyField, CreateNoteBodyField } from '@src/dataStruct/note/body';
import { NOTE_API } from '@src/const/api/note';
import { MyResponse } from '@src/dataStruct/response';

export const noteRTK = createApi({
    reducerPath: 'noteRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getNotes: builder.query<MyResponse<PagedNoteField>, GetNotesBodyField>({
            query: (body) => ({
                url: NOTE_API.GET_NOTES,
                method: 'POST',
                body,
            }),
        }),
        createNote: builder.mutation<MyResponse<NoteField>, CreateNoteBodyField>({
            query: (body) => ({
                url: NOTE_API.CREATE_NOTE,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetNotesQuery, useCreateNoteMutation } = noteRTK;
