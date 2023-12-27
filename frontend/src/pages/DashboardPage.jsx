import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Activity from "../components/Acivity/Activity";
import { useSelector, useDispatch } from "react-redux";

const DashboardPage = () => {
  const [activities, setActivities] = useState([]);
  const { dashboardActivities, userActivities } = useSelector(
    (state) => state.activity
  );

  useEffect(() => {
    setActivities(Object.values(dashboardActivities));
    //  console.log(Object.values(dashboardActivities));
  }, [dashboardActivities, userActivities]);

  console.log(activities);
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
      gap={2}
    >
      {activities.length > 0 ? (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            User Activities :{" "}
          </Typography>
          <Stack direction="row" gap={5} padding={2}>
            {activities.map((activity) => (
              <Activity key={activity.activityid} activity={activity} />
            ))}
          </Stack>
        </>
      ) : (
        <Typography
          variant="h5"
          color="crimson"
          sx={{
            margin: "4rem auto",
          }}
        >
          No User Activity Found !
        </Typography>
      )}
    </Stack>
  );
};

export default DashboardPage;
