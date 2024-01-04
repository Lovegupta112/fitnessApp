import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  users: [],
  error: null,
  currentConnectionDetails:'',
};

export const fetchUsersIfActivityExist = createAsyncThunk(
  "connection/fetchUsers",
  async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const res = await axios.get("/users/getAllUsersIfActivityExist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const addConnection = createAsyncThunk(
  "connection/addConnection",
  async ({ connectionid, senderid, acceptedrequest }) => {
    try {
      const token = localStorage.getItem("jwt-token");
      // console.log(connectionid);
      //  const res=await axios.post("/connection/addConnection",{connectionid,createdat:Date.now()},{
      const res = await axios.post(
        "/connection/addConnection",
        { connectionid, senderid, acceptedrequest,createdat:Date.now() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      return { connectionid, senderid, acceptedrequest };
    } catch (error) {
      throw error.message;
    }
  }
);

export const cancelConnection = createAsyncThunk(
  "connection/cancelConnection",
  async ({ connectionid, senderid }) => {
    try {
      const token = localStorage.getItem("jwt-token");
      console.log(connectionid);
      const res = await axios.delete(
        `/connection/deleteRequest/${connectionid}-${senderid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return { connectionid, senderid };
    } catch (error) {
      throw error.message;
    }
  }
);



export const acceptRequest = createAsyncThunk(
  "connection/acceptRequest",
  async ({connectionid,senderid,acceptedRequest}) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const res = await axios.patch(
        `/connection/acceptRequest`,
        {connectionid,senderid,acceptedRequest},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return {connectionid,senderid,acceptedRequest};
    } catch (error) {
      throw error.message;
    }
  }
);

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers:{
    addCurrentConnectionDetails:(state,action)=>{
     state.currentConnectionDetails=action.payload;
    }
   },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersIfActivityExist.fulfilled, (state, action) => {
      const data = action.payload;
      state.users = data;
    }),
      builder.addCase(fetchUsersIfActivityExist.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(addConnection.fulfilled, (state, action) => {
        const { connectionid, senderid, acceptedrequest } = action.payload;
        state.users = state.users.map((user) => {
          if (user.userid === connectionid) {
            user.connectionid = connectionid;
            user.senderid = senderid;
            user.acceptedrequest = acceptedrequest;
            user.createdat=Date.now();
          }
          return user;
        });
        state.error = null;
      }),
      builder.addCase(addConnection.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(cancelConnection.fulfilled, (state, action) => {
        const { connectionid, senderid } = action.payload;
        state.users = state.users.map((user) => {
          if (
            user.connectionid === connectionid &&
            user.senderid === senderid
          ) {
            user.acceptedrequest = null;
          }
          return user;
        });
        state.error = null;
      }),
      builder.addCase(cancelConnection.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(acceptRequest.fulfilled, (state, action) => {
        const {connectionid,senderid,acceptedRequest} = action.payload;
        state.users = state.users.map((user)=>{
            if (
                user.connectionid === connectionid &&
                user.senderid === senderid
              ) {
                user.acceptedrequest = acceptedRequest;
              }
              return user;
        });
        state.error = null;
      }),
        builder.addCase(acceptRequest.rejected, (state, action) => {
          state.error = action.error;
        })
  },
});

export const {addCurrentConnectionDetails}=connectionSlice.actions;
export default connectionSlice.reducer;
