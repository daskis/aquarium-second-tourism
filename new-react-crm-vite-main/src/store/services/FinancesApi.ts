import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {checkboxCategories} from "@/components";

export const financesApi = createApi({
    reducerPath: "financesApi",
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
        getFinances: build.query({
            query: () => ({
                url: "/api/v1/finance/",
                method: "GET",
            }),
            transformResponse(response) {
                return response
            }
        }),
        getFilteredFinances: build.query({
            query: ({date_start, date_end, type, checkboxes}) => {
                let url = '/api/v1/finance?';
                if (date_start) {
                    url += `date_start=${date_start}&`;
                }
                if (date_end) {
                    url += `date_end=${date_end}&`;
                }
                if (type) {
                    url += `operation_type=${type}&`;
                } else {
                    checkboxCategories.forEach(({name}) => {
                        if (checkboxes[name]) {
                            url += `${name}=${checkboxes[name]}&`;
                        }
                    });
                }

                return {url};
            },
        }),
        getDetailedFinance: build.query({
            query: ({
                        url,
                        id,
                    }) => ({
                url: `/api/v1/${url}/${id}`
            })
        }),
        patchFinances: build.mutation({
            query: ({id, url, body}) => ({
                url: `/api/v1/${url}/${id}`,
                method: "PATCH",
                body: body
            })
        }),
        sendFinance: build.mutation({
            query: ({url, body}) => ({
                url: `/api/v1/${url}/`,
                method: "POST",
                body: body
            })
        }),
        getInvesotrs: build.query({
            query: () => ({
                url: "/api/v1/investors",
                methid: "GET"
            })
        }),
        getLoans: build.query({
            query: () => ({
                url: "/api/v1/loans_filter",
                methid: "GET"
            })
        }),
        getEmployee: build.query({
            query: () => ({
                url: "/api/v1/employee",
                methid: "GET"
            })
        }),
        getLenders: build.query({
            query: () => ({
                url: "/api/v1/lender",
                methid: "GET"
            })
        }),
        getExpences: build.query({
            query: () => ({
                url: "/api/v1/expenses_type",
                methid: "GET"
            })
        }),
        getSupplier:  build.query({
            query: () => ({
                url: "/api/v1/supplier",
                methid: "GET"
            })
        }),


    })
})
export const {
    useGetInvesotrsQuery,
    useGetFinancesQuery,
    useSendFinanceMutation,
    useLazyGetDetailedFinanceQuery,
    usePatchFinancesMutation,
    useLazyGetFilteredFinancesQuery,
    useGetLoansQuery,
    useGetEmployeeQuery,
    useGetLendersQuery,
    useGetExpencesQuery,
    useGetSupplierQuery
} = financesApi