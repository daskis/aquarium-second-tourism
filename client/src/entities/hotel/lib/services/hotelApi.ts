import {mainApi} from "@shared/lib/store/api";

export const hotelApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getHotels: build.query({
            query: () => ({
                url: `/dashboard/api/hostel/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetHotelsQuery} = hotelApi