import {mainApi} from "@shared/lib/store/api";

export const interestingApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getInteresting: build.query({
            query: () => ({
                url: `/dashboard/api/facilities/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetInterestingQuery} = interestingApi