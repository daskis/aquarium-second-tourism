import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const investorsApi = createApi({
    reducerPath: "investorsApi",
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

        getInvestor: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/investors/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/investors",
                method: "GET",
                    }
                }
            },
        }), 
        
        postInvestor: build.mutation({
            query: (body) => ({
                url: `/api/v1/investors/`,
                method: "POST",
                body: body
            })
        }),

        patchInvestor: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/investors/${uuid}`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteInvestor: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/investors/${uuid}`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetInvestorQuery, 
    useDeleteInvestorMutation, 
    useLazyGetInvestorQuery,
    usePostInvestorMutation,
    usePatchInvestorMutation
} = investorsApi