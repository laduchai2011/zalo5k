import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedMyCustomerField, MyCustomerBodyField } from '@src/dataStruct/myCustom';
import { MYCUSTOMER_API } from '@src/const/api/myCustomer';
import { MyResponse } from '@src/dataStruct/response';

export const myCustomerRTK = createApi({
    reducerPath: 'myCustomerRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        getMyCustomers: builder.query<MyResponse<PagedMyCustomerField>, MyCustomerBodyField>({
            query: (body) => ({
                url: MYCUSTOMER_API.GET_MYCUSTOMERS,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMyCustomersQuery } = myCustomerRTK;
