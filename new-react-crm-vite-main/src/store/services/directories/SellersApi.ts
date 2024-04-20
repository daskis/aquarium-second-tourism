import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const sellersApi = createApi({
    reducerPath: "sellersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://vegas.pythonanywhere.com",
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');

            // Добавление токена в заголовок Authorization, если он доступен
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (build) => ({
        getSellers: build.query({
            query: (arg) => ({
                url: "/api/v1/sellers",
                method: "GET",
            }),
            // transformResponse(response) {
            //     console.log(response)
            // }
        }),

        postFinance: build.mutation({
            query: (body) => ({
                url: `/api/v1/sellers/`,
                method: "POST",
                body: body
            })
        }),

        patchSellers: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/sellers/${uuid}`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deletePartners: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/partners/${uuid}`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetSellersQuery, usePatchSellersMutation, usePostFinanceMutation, useLazyGetSellersQuery, useDeletePartnersMutation} = sellersApi