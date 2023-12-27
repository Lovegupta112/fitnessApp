import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/userSlice";
import authReducer from "../app/features/authSlice";
import activityReducer from "../app/features/activitySlice";
import filterReducer from "../app/features/filterSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    activity: activityReducer,
    filter:filterReducer,
  },
});

export default store;
