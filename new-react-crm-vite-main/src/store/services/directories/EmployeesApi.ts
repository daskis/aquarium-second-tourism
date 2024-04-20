import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
    reducerPath: "employeesApi",
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

        getEmployees: build.query({
            query: (uuid) => {
                if (uuid){
                    return{
                        url: `/api/v1/employee/${uuid}`,
                        method: "GET",
                    }
                } else {
                    return{
                        url: "/api/v1/employee",
                        method: "GET",
                    }
                }
            },
        }), 
        
        postEmployees: build.mutation({
            query: (body) => ({
                url: `/api/v1/employee/`,
                method: "POST",
                body: body
            })
        }),

        patchEmployees: build.mutation({
            query: ({data, uuid}) => ({
                url: `/api/v1/employee/${uuid}`,
                method: 'PATCH',
                body: data,
            }),
            
          }),

          deleteEmployees: build.mutation({
            query: (uuid) => ({
                url: `/api/v1/employee/${uuid}`,
                method: 'DELETE',
            }),
            
          }),


    })
})
export const {useGetEmployeesQuery, 
    useDeleteEmployeesMutation,
useLazyGetEmployeesQuery,
usePatchEmployeesMutation,
usePostEmployeesMutation} = employeesApi