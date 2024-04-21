import {mainApi} from "@shared/lib/store/api";

export const tourApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getTours: build.query({
            query: () => ({
                url: `/dashboard/api/travels/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetToursQuery} = tourApi