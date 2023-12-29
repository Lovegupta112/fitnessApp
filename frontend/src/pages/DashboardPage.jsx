import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Activity from "../components/Acivity/Activity";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../app/features/activitySlice";
import { checkAuthentication } from "../app/features/authSlice";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const DashboardPage = () => {
  const [activities, setActivities] = useState([]);
  const [isDashboardActivityExist,setIsDashboardActivityExist]=useState(false);
  const { userActivities } = useSelector(
    (state) => state.activity
  );
  const auth=useSelector((state)=>state.auth);
  const user=useSelector((state)=>state.user);

  const dispatch=useDispatch();
  console.log('userActivities: ',userActivities);

useEffect(()=>{
  // dispatch(checkAuthentication());
dispatch(fetchActivities());
},[]);


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

  // console.log('dashboard activities: ',activities);
  return (
    <Stack
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
          <Stack direction="row" gap={2} padding={2} sx={{
            width:'100%',
            // border:'1px solid red',
            flexWrap:'wrap',
            justifyContent:'space-around',
            rowGap:'4rem'
          }}>
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
