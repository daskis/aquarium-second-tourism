import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TasksData} from "@/pages";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://vegas.pythonanywhere.com/",
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
        getTasks: build.query({
            query: () => ({

                url: "/api/v1/tasks/",
                method: "GET",
            }),
            transformResponse(response: TasksData) {
                return response;
            },
        }),
        getFilteredTasks: build.query({
            query: (filtersData) => {
                if (filtersData) {
                    const {debt_date_start, debt_date_end, created_by, executor, loan, important, status} = filtersData;
                    let url = '/api/v1/tasks/?';
                    if (debt_date_start) {
                        url += `date_start=${debt_date_start}&`;
                    }
                    if (debt_date_end) {
                        url += `date_end=${debt_date_end}`;
                    }
                    if (created_by) {
                        if (debt_date_start) {
                            url += `&created_by=${created_by}&`;
                        } else {
                            url += `created_by=${created_by}&`;
                        }
                    }
                    if (executor) {
                        if (debt_date_start) {
                            url += `&executor=${executor}&`;
                        } else {
                            url += `executor=${executor}&`;
                        }
                    }
                    if (loan) {
                        if (debt_date_start) {
                            url += `&loan=${loan}&`;
                        } else {
                            url += `loan=${loan}&`;
                        }
                    }
                    if (important) {
                        if (debt_date_start) {
                            url += `&important=${important}&`;
                        } else {
                            url += `important=${important}&`;
                        }
                    }
                    if (status) {
                        if (debt_date_start) {
                            url += `&task_status=${status}`;
                        } else {
                            url += `task_status=${status}`;
                        }
                    }
                    return {url}
                } else {
                    return {
                        url: "/api/v1/tasks/",
                    }
                }
            },
            transformResponse(response) {
                return response;
            },
        }),
        getTask: build.query({
            query: ({id}) => ({
                url: `/api/v1/tasks/${id}`
            })
        }),
        patchTask: build.mutation({
            query: ({id, body}) => ({
                url: `/api/v1/tasks/${id}`,
                method: "PATCH",
                body: body
            })
        }),
        sendTask: build.mutation({
            query: (data) => ({
                url: "/api/v1/tasks/",
                method: "POST",
                body: data
            })
        }),

        getSidebarTasks: build.query({
            query: () => ({
                url: "/api/v1/tasks_count/",
                method: "GET",
            }),
        }),



    })
})

export const {
    usePatchTaskMutation,
    useGetTasksQuery,
    useLazyGetFilteredTasksQuery,
    useLazyGetTaskQuery,
    useSendTaskMutation,
    useGetSidebarTasksQuery
}
    = tasksApi

