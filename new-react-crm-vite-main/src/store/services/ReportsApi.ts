import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ISettlementsReports, SettlementsTypeEnum} from "@/types";

// Define a service using a base URL and expected endpoints
export const reportsApi = createApi({
    reducerPath: 'reportsApi',
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
    endpoints: (builder) => ({
        getSuitcaseReports: builder.query({
            query: (date) => ({
                url: `/api/v1/investment_statistic?${date}`
            }),
            transformResponse: (response) => {
                return response
            }
        }),
        setSuitcaseReports: builder.mutation({
            query: (data: { date_start: string, date_end: string }) => ({
                url: "suitcase",
                method: "POST",
                body: data
            })
        }),
        getProfitsReports: builder.query({
            query: ({profit_method, date_start, date_end}) => ({
                url: `/api/v1/profit_report/?date_start=${date_start}&date_end=${date_end}&profit_method=${profit_method}`
            }),
            transformResponse: (response) => {
                return response
            }
        }),
        getSettlementsReports: builder.query({
            query: ({type, date}: { type: SettlementsTypeEnum, date: string[] }) => {
                return {
                    method: "GET",
                    url: `api/v1/profitshare_report/${type}?date_start=${date[0]}&date_end=${date[1]}`
                }
            },
            transformResponse: (response: ISettlementsReports[]) => {
                return response
            }
        }),

    })

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLazyGetProfitsReportsQuery,
    useLazyGetSuitcaseReportsQuery,
    useLazyGetSettlementsReportsQuery
} = reportsApi