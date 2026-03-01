import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderField } from '@src/dataStruct/order';
import { CreateOrderBodyField } from '@src/dataStruct/order/body';
import { ORDER_API } from '@src/const/api/order';
import { MyResponse } from '@src/dataStruct/response';

export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        createOrder: builder.mutation<MyResponse<OrderField>, CreateOrderBodyField>({
            query: (body) => ({
                url: ORDER_API.CREATE_ORDER,
                method: 'POST',
                body,
            }),
            // invalidatesTags: ['Medication'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
    }),
});

export const { useCreateOrderMutation } = orderRTK;
