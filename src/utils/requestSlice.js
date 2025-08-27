import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addRequest: (state,action) => {
            return action.payload;
        },
        removeRequest: (state,action) => {
            const id = action.payload;
            return state.filter(data => data._id != id);
        }
    }
})
export const{addRequest,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;