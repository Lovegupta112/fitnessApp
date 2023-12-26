import { Stack ,Typography} from '@mui/material';
import {useState,useEffect} from 'react'
import ActivityCard from '../components/Acivity/ActvityCard';
import Activity from '../components/Acivity/Activity';
import { useSelector,useDispatch } from 'react-redux';

const DashboardPage = () => {

  const [activities,setActivities]=useState([]);
  const {userActivities}=useSelector((state)=>state.activity);


  useEffect(()=>{
     setActivities(userActivities);
  },[userActivities]);

  console.log(activities);
  return (
    <Stack  sx={{
      minHeight: "calc(100vh - 10vh)",
    }}
    padding={2}
    gap={2}>
        <Typography sx={{
        fontSize:'2rem',
      }}>DashBoard</Typography>
      {/* <ActivityCard/> */}
      {activities.map((activity)=> <Activity  key={activity.activityid} activity={activity}/>)}
    </Stack>
  )
}

export default DashboardPage;