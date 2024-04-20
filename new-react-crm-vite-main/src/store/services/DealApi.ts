import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dealApi = createApi({
    reducerPath: "dealApi",
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

        getDeals: build.query({
            query: (filtersData) => {
                const queryParams = new URLSearchParams();
    
                if (filtersData) {
                    const {
                        debt_date,
                        date_start,
                        date_end,
                        partner,
                        investor,
                        creditor,
                        status,
                        client,
                        product,
                        debt_price,
                        passport_serial,
                        passport_number
                    } = filtersData;
    
                    if (debt_date) queryParams.append('debt_date', debt_date);
                    if (date_start) queryParams.append('date_start', date_start);
                    if (date_end) queryParams.append('date_end', date_end);
                    if (creditor) queryParams.append('creditor', creditor);
                    if (investor) queryParams.append('investor', investor);
                    if (partner) queryParams.append('partner', partner);
                    if (status) queryParams.append('status', status);
                    if (product) queryParams.append('product', product);
                    if (client) queryParams.append('client', client);
                    if (debt_price && debt_price!=='.00') queryParams.append('debt_price', debt_price);
                    if (passport_serial) queryParams.append('passport_serial', passport_serial);
                    if (passport_number) queryParams.append('passport_number', passport_number);
                }
    
                return {
                    url: `/api/v1/loans_list${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
                    method: "GET"
                };
            },
        }),

        getDealuuid: build.query({
            query: (uuid) => ({
                url: `/api/v1/loans/${uuid}`,
                method: "GET",
            })
        }),

        patchDeal: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/loans/${uuid}`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteDeal: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/loans/${uuid}`,
                method: 'DELETE',
            }),
            
          }),

          postDeal: build.mutation({
            query: (body) => ({
                url: "/api/v1/loans/",
                method: "POST",
                body: body
            })
        }),

        downloadDeal: build.query({
            query: (uuid) => ({
                url: `/api/v1/loan/download/${uuid}/`,
                method: "GET",
            })
        }),




    })
})
export const {useGetDealsQuery, 
    useLazyGetDealuuidQuery, 
    usePatchDealMutation, 
    usePostDealMutation,
    useDeleteDealMutation,
    useLazyGetDealsQuery,
    useLazyDownloadDealQuery
} = dealApi

