import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://vegas.pythonanywhere.com"
    }),
    endpoints: (build) => ({
        getLogin: build.mutation({
            query: (arg) => ({
                url: "/auth/jwt/create",
                method: "POST",
                body: arg
            }),
            transformResponse({access}) {
                localStorage.setItem("token", access)
            }
        }),
        verifyUser: build.mutation({
            query: (token) => ({
                url: "/auth/jwt/verify",
                body: token,
                method: "POST"
            })
        })


    })
})
export const {useGetLoginMutation, useVerifyUserMutation} = loginApi