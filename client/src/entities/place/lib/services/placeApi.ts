import {mainApi} from "@shared/lib/store/api";

export const placeApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getPlaces: build.query({
            query: () => ({
                url: `/dashboard/api/general/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetPlacesQuery} = placeApi