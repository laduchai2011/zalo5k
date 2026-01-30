import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ZaloAppField, PagedZaloOaField } from '@src/dataStruct/zalo';
import { ZaloAppWithAccountIdBodyField, ZaloOaListWith2FkBodyField } from '@src/dataStruct/zalo/body';
import { ZALO_API } from '@src/const/api/zalo';
import { MyResponse } from '@src/dataStruct/response';

export const zaloRTK = createApi({
    reducerPath: 'zaloRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getZaloAppWithAccountId: builder.query<MyResponse<ZaloAppField>, ZaloAppWithAccountIdBodyField>({
            query: (body) => ({
                url: ZALO_API.GET_ZALOAPP_WITH_ACCOUNT_ID,
                method: 'POST',
                body,
            }),
        }),
        getZaloOaListWith2Fk: builder.query<MyResponse<PagedZaloOaField>, ZaloOaListWith2FkBodyField>({
            query: (body) => ({
                url: ZALO_API.GET_ZALOOA_LIST_WITH_2FK,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetZaloAppWithAccountIdQuery, useGetZaloOaListWith2FkQuery } = zaloRTK;
