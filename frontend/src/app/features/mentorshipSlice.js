import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const initialState={
  sessionList:[],
  error:null
}

export const bookSession=createAsyncThunk('session/bookSession',async ({date,time})=>{
 try{
    const token=localStorage.getItem('jwt-token');
    const res=await axios.post('/session/bookSession',{sessionDate:date,sessionTime:time},{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    );
    console.log(res.data);
    console.log(date,time);
    return {session_date:date,session_time:time}
 }
 catch(error){
    throw error.message;
 }
})

export const fetchSessions=createAsyncThunk('session/fetchSessions',async()=>{
    try{
     const token=localStorage.getItem('jwt-token');
     const res=await axios.get('/session/fetchSessions',{headers:{
        'Authorization':`Bearer ${token}`
     }})
    //  console.log(res.data);
     return res.data;
    }
    catch(error){
        throw error.message;
    }
})

export const deleteSession=createAsyncThunk('session/deleteSession',async()=>{
    try{
    const token=localStorage.getItem('jwt-token');
    const res=await axios.delete(); 
    }
    catch(error){
        throw error.message;
    }
})
const mentorshipSlice=createSlice({
    name:'session',
    initialState,
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder.addCase(bookSession.fulfilled,(state,action)=>{
             state.sessionList.push(action.payload);
             state.error=null;
        }),
        builder.addCase(bookSession.rejected,(state,action)=>{
           state.error=action.error;
        }),
        builder.addCase(fetchSessions.fulfilled,(state,action)=>{
             state.sessionList=action.payload;
             state.error=null;
        }),
        builder.addCase(fetchSessions.rejected,(state,action)=>{
           state.error=action.error;
        })
    }
})

// export const {addSession}=mentorshipSlice.actions;
export default mentorshipSlice.reducer;