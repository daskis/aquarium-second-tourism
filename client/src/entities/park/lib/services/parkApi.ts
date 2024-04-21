import {mainApi} from "@shared/lib/store/api";

export const parkApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getPark: build.query({
            query: () => ({
                url: `/auth/login/`,
                method: "GET",
            })
        }),
    })
})
export const {useGetParkQuery} = parkApi