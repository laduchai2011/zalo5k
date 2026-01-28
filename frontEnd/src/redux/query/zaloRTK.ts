import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ZaloAppField } from '@src/dataStruct/zalo';
import { ZaloAppWithAccountIdBodyField } from '@src/dataStruct/zalo/body';
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
    }),
});

export const { useGetZaloAppWithAccountIdQuery } = zaloRTK;
