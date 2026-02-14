import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccountField, AddMemberBodyField, AllMembersBodyField, PagedAccountField } from '@src/dataStruct/account';
import {
    GetReplyAccountBodyField,
    GetNotReplyAccountBodyField,
    CreateReplyAccountBodyField,
} from '@src/dataStruct/account/body';
import { ACCOUNT_API } from '@src/const/api/account';
import { router_res_type } from '@src/interface';
import { MyResponse } from '@src/dataStruct/response';

export const accountRTK = createApi({
    reducerPath: 'accountRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: ['Account', 'MemberList', 'MemberReceiveMessage', 'ReplyAccounts', 'NotReplyAccounts'],
    endpoints: (builder) => ({
        getAccountWithId: builder.query<MyResponse<AccountField>, { id: number }>({
            query: ({ id }) => `${ACCOUNT_API.GET_ACCOUNT_WITH_ID}?id=${id}`,
        }),
        getMemberReceiveMessage: builder.query<MyResponse<AccountField>, void>({
            query: () => ACCOUNT_API.GET_MEMBER_RECEIVE_MESSAGE,
            providesTags: ['MemberReceiveMessage'],
        }),
        getAllMembers: builder.query<MyResponse<AccountField[]>, AllMembersBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_ALL_MEMBERS,
                method: 'POST',
                body,
            }),
            providesTags: ['MemberList'],
        }),
        getReplyAccounts: builder.query<MyResponse<PagedAccountField>, GetReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_REPLY_ACCOUNt,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'ReplyAccounts', id: `LIST-${arg.chatRoomId}` }],
        }),
        getNotReplyAccounts: builder.query<MyResponse<PagedAccountField>, GetNotReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_NOT_REPLY_ACCOUNT,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'NotReplyAccounts', id: `LIST-${arg.chatRoomId}` }],
        }),
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
        signout: builder.mutation<MyResponse<unknown>, void>({
            query: () => ({
                url: ACCOUNT_API.SIGNOUT,
                method: 'POST',
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        addMember: builder.mutation<MyResponse<AccountField>, AddMemberBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.ADD_MEMBER,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MemberList'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        setMemberReceiveMessage: builder.mutation<MyResponse<AccountField>, AccountField>({
            query: (body) => ({
                url: ACCOUNT_API.SET_MEMBER_RECEIVE_MESSAGE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MemberReceiveMessage'],
        }),
        createReplyAccount: builder.mutation<MyResponse<AccountField>, CreateReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.CREATE_REPLY_ACCOUNT,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'NotReplyAccounts', id: `LIST-${arg.chatRoomId}` },
                { type: 'ReplyAccounts', id: `LIST-${arg.chatRoomId}` },
            ],
        }),
    }),
});

export const {
    useGetAccountWithIdQuery,
    useGetMemberReceiveMessageQuery,
    useGetAllMembersQuery,
    useGetReplyAccountsQuery,
    useGetNotReplyAccountsQuery,
    useSignupMutation,
    useSigninMutation,
    useSignoutMutation,
    useAddMemberMutation,
    useSetMemberReceiveMessageMutation,
    useCreateReplyAccountMutation,
} = accountRTK;
