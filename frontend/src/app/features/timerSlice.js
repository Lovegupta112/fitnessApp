import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isTimerRunning:false,
}


const timerSlice=createSlice({
    name:'timer',
    initialState,
    reducers:{
        updateTimer:(state,action)=>{
            state.isTimerRunning=action.payload;
        }
    }
})

export const {updateTimer}=timerSlice.actions;
export default timerSlice.reducer;