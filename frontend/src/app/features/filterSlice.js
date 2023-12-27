import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selectedActivity:''
}

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        setFilterActivity:(state,action)=>{
            state.selectedActivity=action.payload;
        }
    }
})

export const {setFilterActivity}=filterSlice.actions;
export default filterSlice.reducer;