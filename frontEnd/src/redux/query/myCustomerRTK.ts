import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMyCustomerField, MyCustomerBodyField } from '@src/dataStruct/myCustom';
import { ZaloCustomerField } from '@src/dataStruct/hookData';
import { MYCUSTOMER_API } from '@src/const/api/myCustomer';
import { MyResponse } from '@src/dataStruct/response';

export const myCustomerRTK = createApi({
    reducerPath: 'myCustomerRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMyCustomers: builder.query<MyResponse<PagedMyCustomerField>, MyCustomerBodyField>({
            query: (body) => ({
                url: MYCUSTOMER_API.GET_MY_CUSTOMERS,
                method: 'POST',
                body,
            }),
        }),
        getInforCustomerOnZalo: builder.query<MyResponse<ZaloCustomerField>, { customerId: string }>({
            query: ({ customerId }) => `${MYCUSTOMER_API.GET_INFOR_CUSTOMER_ON_ZALO}?customerId=${customerId}`,
        }),
    }),
});

export const { useGetMyCustomersQuery, useGetInforCustomerOnZaloQuery } = myCustomerRTK;
