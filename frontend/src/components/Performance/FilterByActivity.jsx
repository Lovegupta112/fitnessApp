import {useState,useEffect} from 'react'
import CustomDropdown from '../common/CustomDropdown';
import { useSelector } from 'react-redux';
import { Stack,Typography } from '@mui/material';



const FilterByActivity = () => {

    const [selectedActivities, setSelectedActivities] = useState([]);
    const {selectedActivity}=useSelector((state)=>state.activity);
    console.log(selectedActivity);

    useEffect(()=>{

       setActivity(selectedActivity);
    },[selectedActivity]);

    const setActivity = (activities) => {
        let activityArr = [];
        for (let activity in activities) {
          const isSelected = activities[activity];
          if (isSelected) {
            activityArr.push(activity);
          }
        }
        setSelectedActivities(activityArr);
      };
    
  return (
    <Stack>
         {selectedActivities.length<=0?
           <Typography>
           Please Select Your Favorite Activity from Favorite Section ...{" "}
         </Typography> :
         <CustomDropdown menuItems={selectedActivities} name='Filter By Activity'/>
        }
    </Stack>
  )
}

export default FilterByActivity;