import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/userSlice";
import authReducer from "../app/features/authSlice";
import activityReducer from "../app/features/activitySlice";
import filterReducer from "../app/features/filterSlice";
import timerReducer from "./features/timerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    activity: activityReducer,
    filter:filterReducer,
    timer:timerReducer
  },
});

export default store;
