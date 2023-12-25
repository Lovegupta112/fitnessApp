import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthentication: (state) => {
      const tokenExist = localStorage.getItem("jwt-token");
      if (tokenExist) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    setAuthentication: (state, action) => {
      // console.log(action.payload);
      const token = action.payload;
      localStorage.setItem("jwt-token", token);
      state.isAuthenticated = true;
    },
    removeAuthentication: (state) => {
      const tokenExist = localStorage.getItem("jwt-token");
      if (tokenExist) {
        localStorage.removeItem("jwt-token");
      }
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthentication, removeAuthentication, checkAuthentication } =
  authSlice.actions;
export default authSlice.reducer;
