import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Activity from "../components/Acivity/Activity";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../app/features/activitySlice";

const DashboardPage = () => {
  const [activities, setActivities] = useState([]);
  const [isDashboardActivityExist,setIsDashboardActivityExist]=useState(false);
  const { userActivities } = useSelector(
    (state) => state.activity
  );
  const dispatch=useDispatch();

useEffect(()=>{
dispatch(fetchActivities());
},[])
  useEffect(() => {
    setActivities(userActivities);
    const anyActivity=userActivities.find((activity)=>activity.dashboardstatus===true);
    if(anyActivity){
      setIsDashboardActivityExist(true);
    }
    else {
      setIsDashboardActivityExist(false);
    }
  }, [userActivities]);

  console.log('dashboard activities: ',activities);
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
      gap={2}
    >
      {isDashboardActivityExist ? (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            User Activities :
          </Typography>
          <Stack direction="row" gap={5} padding={2}>
            {activities.filter((activity) =>activity.dashboardstatus===true).map((activity)=>( <Activity key={activity.activityid} activity={activity} />))}
          </Stack>
        </>
      ) : (
        <Typography
          variant="h5"
          color="crimson"
          sx={{
            margin: "4rem auto",
            fontWeight:'700'
          }}
        >
          No User Activity Found !
        </Typography>
      )}
    </Stack>
  );
};

export default DashboardPage;
