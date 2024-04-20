import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const expensesApi = createApi({
    reducerPath: "expensesApi",
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

        getExpenses: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/expenses_type/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/expenses_type",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postExpenses: build.mutation({
            query: (body) => ({
                url: `/api/v1/expenses_type/`,
                method: "POST",
                body: body
            })
        }),

        patchExpenses: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/expenses_type/${uuid}/`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteExpenses: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/expenses_type/${uuid}/`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetExpensesQuery, useDeleteExpensesMutation,useLazyGetExpensesQuery,usePatchExpensesMutation,usePostExpensesMutation} = expensesApi