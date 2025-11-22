import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMyCustomField, MyCustomBodyField } from '@src/dataStruct/myCustom';
import { MYCUSTOM_API } from '@src/const/api/myCustom';
import { MyResponse } from '@src/dataStruct/response';

export const myCustomRTK = createApi({
    reducerPath: 'myCustomRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMyCustoms: builder.query<MyResponse<PagedMyCustomField>, MyCustomBodyField>({
            query: (body) => ({
                url: MYCUSTOM_API.GET_MYCUSTOMS,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMyCustomsQuery } = myCustomRTK;
