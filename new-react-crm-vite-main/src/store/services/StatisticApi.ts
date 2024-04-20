import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const statisticApi = createApi({
    reducerPath: 'statisticApi',
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

    endpoints: (builder) => ({
        getStatistic: builder.query({
            query: (filtersData) => {
                if (filtersData){
                    const {debt_date, debt_date_start, debt_date_end, creditors, investors, partners} = filtersData;
                    return {
                        url: `/api/v1/statistic/?debt_date=${debt_date}&date_start=${debt_date_start}&date_end=${debt_date_end}&creditor=${creditors}&investor=${investors}&partner=${partners}`,
                        method: "GET"
                    }
                } else {
                    return {
                        url: `/api/v1/statistic`,
                    }
                }
            },
        }),
    })

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetStatisticQuery, useLazyGetStatisticQuery} = statisticApi