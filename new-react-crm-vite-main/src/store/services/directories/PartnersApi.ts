import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const partnersApi = createApi({
    reducerPath: "partnersApi",
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

        getPartners: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/partners/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/partners",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postPartners: build.mutation({
            query: (body) => ({
                url: `/api/v1/partners/`,
                method: "POST",
                body: body
            })
        }),

        patchPartners: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/partners/${uuid}`,
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
export const {useGetPartnersQuery,
useDeletePartnersMutation,
useLazyGetPartnersQuery,
usePatchPartnersMutation,
usePostPartnersMutation} = partnersApi