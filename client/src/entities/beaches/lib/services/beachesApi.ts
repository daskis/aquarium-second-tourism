import {mainApi} from "@shared/lib/store/api";

export const beachesApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getBeaches: build.query({
            query: () => ({
                url: `/dashboard/api/beach/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetBeachesQuery} = beachesApi