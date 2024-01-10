import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Activity from "../components/Acivity/Activity";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities ,fetchConnectionActivities} from "../app/features/activitySlice";
import { checkAuthentication } from "../app/features/authSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const DashboardPage = () => {
  const [activities, setActivities] = useState([]);
  const [isDashboardActivityExist,setIsDashboardActivityExist]=useState(false);
  const [dataLoadedNo,setDataLoadedNo]=useState(0);
  const { userActivities ,connectionActivities} = useSelector(
    (state) => state.activity
  );
  const {currentConnectionDetails}=useSelector((state)=>state.connection);
  const user=useSelector((state)=>state.user);
  const {userid}=useParams();
  console.log('userid: ',userid);
  console.log('connectionActivities: ',connectionActivities);
  console.log('currentConnectionDetails: ',currentConnectionDetails,"current User: ",user);
  // const user=useSelector((state)=>state.user);

  const dispatch=useDispatch();
  console.log('userActivities: ',userActivities);

  // console.log('activities: ',activities);
useEffect(()=>{
  // dispatch(checkAuthentication());
dispatch(fetchActivities());
},[]);

useEffect(()=>{
if(userid){
dispatch(fetchConnectionActivities(userid));

}
},[userid]);
useEffect(()=>{
  getActivityData();
},[dataLoadedNo,userActivities]);

const getActivityData=()=>{
  // const totalActivityTillNow=[];
console.log('calling getActivityData function..',dataLoadedNo);
  // for(let index=dataLoadedNo;index<dataLoadedNo+6;index++){
  //   if(userActivities.length<=index){
  //       break;
  //   }
  //     totalActivityTillNow.push(userActivities[index]);
  // }
  // console.log('totalActivityTillNow: ',totalActivityTillNow);
  // if(totalActivityTillNow.length>0){
  //   setActivities((prev)=>[...prev,...totalActivityTillNow]);
  // }
  // const maxDataNo=Math.min(dataLoadedNo+6,userActivities.length)
  // setActivities([...activities,...userActivities.slice(dataLoadedNo,maxDataNo)]);
}

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

//  useEffect(()=>{
//   window.addEventListener('scroll',handleInfiniteScroll);
//   return ()=>{
//     window.removeEventListener('scroll',handleInfiniteScroll);
//   }
//  },[])

  const handleInfiniteScroll=()=>{
    // console.log('scrollHeight: ',document.documentElement.scrollHeight);
    // console.log('innerHeight: ',window.innerHeight);
    // console.log('scrollTop: ',document.documentElement.scrollTop);
    try{
       const totalScrollHeight=window.innerHeight+document.documentElement.scrollTop+1;
       const maxDataNo=Math.min(dataLoadedNo+6,userActivities.length)
      if(totalScrollHeight>document.documentElement.scrollHeight ){
        console.log('touching end...');
        setDataLoadedNo(maxDataNo);
      }
    }
    catch(error){
    console.log('Error: ',error);
    }
  }
  // console.log('dashboard activities: ',activities);
  return (
    <Stack
      padding={3}
      gap={2}
      sx={{
        paddingTop:'15vh'
      }}
    >
      {isDashboardActivityExist ? (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
           {userid && currentConnectionDetails.username ? `${currentConnectionDetails.username}'s Activities`:''}
          </Typography>
          <Stack direction="row" gap={4} padding={4} sx={{
            width:'100%',
            // border:'1px solid red',
            flexWrap:'wrap',
            // justifyContent:'space-evenly',
            rowGap:'6rem'
          }}>
            {
            userid ? 
            connectionActivities.filter((activity) =>activity.dashboardstatus===true).map((activity)=>( <Activity key={activity.activityid} activity={activity} />))
            :activities.filter((activity) =>activity.dashboardstatus===true).map((activity)=>( <Activity key={activity.activityid} activity={activity} />))}
            {(userid && !connectionActivities.find((activity)=>activity.dashboardstatus===true)) && 
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
            }
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
