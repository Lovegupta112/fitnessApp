import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedActivity: {},
  currentActivity: { activityName: "", distance: "", time: "", unit: "" },
  userActivities:[],
  dashboardActivities:[],
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setSelectedActivity: (state, action) => {
      console.log("payload:", action.payload);
      state.selectedActivity = action.payload;
      console.log(state.selectedActivity);
    },
    setCurrentActivity: (state, action) => {
      console.log("payload:", action.payload);
      const data = action.payload;
      if (Object.keys(data).length > 0) {
        state.currentActivity[data.name] = data.value;
      } else {
        state.currentActivity = {
          activityName: "",
          distance: "",
          time: "",
          unit: "",
        };
        //   state=initialState.currentActivity;
      }
    },
    setUserActivities:(state,action)=>{
      console.log("payload: ",action.payload);
      state.userActivities.push(action.payload);
    },
    setDashboardActivities:(state,action)=>{
      state.dashboardActivities.push(action.payload);
    }
  },
});

export const { setSelectedActivity, setCurrentActivity ,setUserActivities,setDashboardActivities} =
  activitySlice.actions;
export default activitySlice.reducer;
