import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedActivity: {},
  currentActivity: { activityName: "", distance: "", time: "", unit: "" },
  userActivities: [],
  error: null,
};

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("jwt-token");

export const fetchActivities = createAsyncThunk(
  "activity/fetchActivities",
  async () => {
    try {
      const res = await axios.get("/activity/getActivities", {
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
export const addActivity = createAsyncThunk(
  "activity/addActivity",
  async ({ currentActivity, time }) => {
    try {
      // console.log("current: ", currentActivity, time);
      const res = await axios.post(
        "/activity/save",
        { ...currentActivity, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (activityid) => {
    try {
      const deletedActivity = await axios.delete(
        `/activity/deleteActivity/${activityid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("deleted Activity: ", deletedActivity);
      return activityid;
    } catch (error) {
      throw error.message;
    }
  }
);

export const updateDashboardActivityStatus = createAsyncThunk(
  "activity/updateDashboardActivityStatus",
  async ({ activityid, status }) => {
    try {
      const res = await axios.patch(
        "activity/updateDashboardStatus",
        { activityid, dashboardStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      return { activityid, status };
    } catch (error) {
      throw error.message;
    }
  }
);

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
      }
    },
    removeCurrentActivity: (state, action) => {
      state.currentActivity = {
        activityName: "",
        distance: "",
        time: "",
        unit: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      state.userActivities = action.payload;
      state.error = null;
    }),
      builder.addCase(fetchActivities.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(deleteActivity.fulfilled, (state, action) => {
        const activityid = action.payload;
        console.log('activityid: ',activityid);
        state.userActivities = state.userActivities.filter(
          (activity) => Number(activity.activityid) !== activityid
        );
        state.error = null;
      }),
      builder.addCase(deleteActivity.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(addActivity.fulfilled, (state, action) => {
        state.userActivities.push(action.payload);
        state.currentActivity = {
          activityName: "",
          distance: "",
          time: "",
          unit: "",
        };
      }),
      builder.addCase(addActivity.rejected, (state, action) => {
        state.error = action.error;
      });
    builder.addCase(
      updateDashboardActivityStatus.fulfilled,
      (state, action) => {
        const { activityid, status } = action.payload;
        state.userActivities = state.userActivities.map((activity) => {
          if (Number(activity.activityid) === Number(activityid)) {
            activity.dashboardstatus = status;
          }
          return activity;
        });
        state.error = null;
      }
    );
    builder.addCase(updateDashboardActivityStatus.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const {
  setSelectedActivity,
  setCurrentActivity,
  removeCurrentActivity,
} = activitySlice.actions;
export default activitySlice.reducer;
