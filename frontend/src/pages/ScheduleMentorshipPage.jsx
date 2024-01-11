import { Stack, Typography } from '@mui/material';
import {useEffect} from 'react';
import healthylifestyle from '../../public/healthylifestyle.jpg';
import MentorshipForm from '../components/Mentorship/MentorshipForm';
import Session from '../components/Mentorship/Session';
import { useSelector ,useDispatch } from 'react-redux';
import { fetchSessions } from '../app/features/mentorshipSlice';

const ScheduleMentorshipPage = () => {

  const {sessionList}=useSelector((state)=>state.mentorship);
  const dispatch=useDispatch();


  console.log('sessionList: ',sessionList);
  
   useEffect(()=>{
    dispatch(fetchSessions());
   },[]);

  return (
    <Stack   padding={3}
    gap={6}
    sx={{
      paddingTop:'18vh',
      padding:'2rem'
    }} >
      <Stack direction='row' justifyContent='space-around'>
      <Stack >
        <img src={healthylifestyle} alt="healthy service page" width='500' />
      </Stack>
      <Stack sx={{flexBasis:'50%'}} gap={6}>
      <Typography variant='h5' sx={{fontWeight:'800',fontSize:'1.7rem'}}>Book a  Fitness Mentorship Session With Us !</Typography>
       <MentorshipForm />
      </Stack>
      </Stack>
      <Stack padding={2} gap={2}>
      <Typography variant='h5'>Your Booked Session: </Typography>
       {sessionList.length>0 ? sessionList.map((session,index)=>(
        <Session info={session} key={session.session_time+index}/>
       )):
       <Typography color='crimson' fontWeight='500' >No Session Found !</Typography>
       }
      </Stack>
    </Stack>
  )
}

export default ScheduleMentorshipPage;