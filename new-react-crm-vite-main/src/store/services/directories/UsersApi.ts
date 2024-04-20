import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
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

        getUsers: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/users/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/users",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postUsers: build.mutation({
            query: (body) => ({
                url: `/api/v1/users/`,
                method: "POST",
                body: body
            })
        }),

        patchUsers: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/users/${uuid}/`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteUsers: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/users/${uuid}/`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetUsersQuery, useDeleteUsersMutation, usePatchUsersMutation, useLazyGetUsersQuery, usePostUsersMutation} = usersApi