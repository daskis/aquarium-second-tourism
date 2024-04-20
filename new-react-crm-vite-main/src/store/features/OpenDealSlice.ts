import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dealStatus = {
    createDealStatus: boolean,
}

const initialState: dealStatus = {
    createDealStatus: false,
}

const activeUserSlice = createSlice({
    name:'createDeal',
    initialState,
    reducers:{
        setCreateDeal(state,action:PayloadAction<boolean>){
            state.createDealStatus = (action.payload)
        },

    }
})


export const {setCreateDeal} = activeUserSlice.actions;
export default activeUserSlice.reducer

