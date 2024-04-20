import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TasksData} from "@/pages";
import {reportsApi} from "@/store/services/ReportsApi.ts";

export const reportsApi = createApi({
    reducerPath: "reportsApi",
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
        getProfits: build.query({
            query: (arg) => ({
                url: "/api/v1/profit_report/",
                method: "GET",
            }),
            transformResponse(response: TasksData) {
                return response;
            },
        })


    })
})
export const {useGetTasksQuery} = reportsApi