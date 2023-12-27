import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedActivity: {},
  currentActivity: { activityName: "", distance: "", time: "", unit: "" },
  userActivities: [],
  dashboardActivities: {},
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },
    setCurrentActivity: (state, action) => {
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
    setUserActivities: (state, action) => {
      state.userActivities = action.payload;
    },
    setDashboardActivities: (state, action) => {
      const { activityid, activity } = action.payload;
      state.dashboardActivities[activityid] = activity;
    },
    removeDashboardActivity: (state, action) => {
      const { activityid } = action.payload;
      delete state.dashboardActivities[activityid];
    },
    removeUserActivity: (state, action) => {
      const { activityid } = action.payload;
      state.userActivities = state.userActivities.filter(
        (activity) => Number(activity.activityid) !== activityid
      );
    },
    removeCurrentActivity:(state,action)=>{
       state.currentActivity={ activityName: "", distance: "", time: "", unit: "" };
    },
  },
});

export const {
  setSelectedActivity,
  setCurrentActivity,
  setUserActivities,
  setDashboardActivities,
  removeDashboardActivity,
  removeUserActivity,
  removeCurrentActivity
} = activitySlice.actions;
export default activitySlice.reducer;
