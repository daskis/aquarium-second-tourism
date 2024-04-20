import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const invoiceApi = createApi({
    reducerPath: "invoiceApi",
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

        getInvoice: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/creditorbillinfo/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/creditorbillinfo",
                        method: "GET",
                    }
                }
            },
            // transformResponse(response) {
            //     console.log(response)
            // }
        }), 
        
        postFinance: build.mutation({
            query: (body) => ({
                url: `/api/v1/creditorbillinfo/`,
                method: "POST",
                body: body
            })
        }),

        patchSellers: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/creditorbillinfo/${uuid}`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteDeal: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/creditorbillinfo/${uuid}`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetInvoiceQuery, 
usePatchSellersMutation, 
usePostFinanceMutation, 
useLazyGetInvoiceQuery,
useDeleteDealMutation} = invoiceApi