import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const lenderApi = createApi({
    reducerPath: "lenderApi",
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

        getLender: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/lender/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/lender",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postLender: build.mutation({
            query: (body) => ({
                url: `/api/v1/lender/`,
                method: "POST",
                body: body
            })
        }),

        patchLender: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/lender/${uuid}/`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteLender: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/lender/${uuid}/`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetLenderQuery, useDeleteLenderMutation, useLazyGetLenderQuery, usePatchLenderMutation, usePostLenderMutation} = lenderApi