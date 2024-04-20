import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const suppliersApi = createApi({
    reducerPath: "suppliersApi",
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

        getSuppliers: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/supplier/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/supplier",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postSuppliers: build.mutation({
            query: (body) => ({
                url: `/api/v1/supplier/`,
                method: "POST",
                body: body
            })
        }),

        patchSuppliers: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/supplier/${uuid}/`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteSuppliers: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/supplier/${uuid}/`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useDeleteSuppliersMutation,
useGetSuppliersQuery,
useLazyGetSuppliersQuery,
usePatchSuppliersMutation,
usePostSuppliersMutation} = suppliersApi