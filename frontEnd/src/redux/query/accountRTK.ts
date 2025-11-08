import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccountField } from '@src/dataStruct/account';
import { ACCOUNT_API } from '@src/const/api/account';
import { router_res_type } from '@src/interface';
import { MyResponse } from '@src/dataStruct/response';

export const accountRTK = createApi({
    reducerPath: 'accountRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        // Mutation (POST)
        signup: builder.mutation<router_res_type, AccountField>({
            query: (body) => ({
                url: ACCOUNT_API.SIGNUP,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        signin: builder.mutation<MyResponse<AccountField>, AccountField>({
            query: (body) => ({
                url: ACCOUNT_API.SIGNIN,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        signout: builder.mutation<MyResponse<AccountField>, void>({
            query: () => ({
                url: ACCOUNT_API.SIGNOUT,
                method: 'POST',
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
    }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } = accountRTK;
