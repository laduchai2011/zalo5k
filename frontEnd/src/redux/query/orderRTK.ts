import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderField, PagedOrderField } from '@src/dataStruct/order';
import { CreateOrderBodyField, OrdersFilterBodyField } from '@src/dataStruct/order/body';
import { ORDER_API } from '@src/const/api/order';
import { MyResponse } from '@src/dataStruct/response';

export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query<MyResponse<PagedOrderField>, OrdersFilterBodyField>({
            query: (body) => ({
                url: ORDER_API.GET_ORDERS,
                method: 'POST',
                body,
            }),
            providesTags: ['Orders'], // dùng nếu muốn refetch sau khi xóa/sửa
        }),
        createOrder: builder.mutation<MyResponse<OrderField>, CreateOrderBodyField>({
            query: (body) => ({
                url: ORDER_API.CREATE_ORDER,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
    }),
});

export const { useLazyGetOrdersQuery, useCreateOrderMutation } = orderRTK;
