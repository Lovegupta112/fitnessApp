import React from 'react';
import {Stack,Typography,Button} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { acceptRequest } from '../../app/features/connectionSlice';
import { useDispatch,useSelector } from 'react-redux';
import { acceptRequest,cancelConnection } from '../../app/features/connectionSlice';

const Request = ({user}) => {
    console.log(user);

    const dispatch=useDispatch();

    const acceptUserRequest=()=>{
    //  dispatch(acceptRequest(user.connectionid));
    console.log(user);
    dispatch(acceptRequest({connectionid:user.connectionid,senderid:user.senderid,acceptedRequest:true}));
    }

    const rejectUserRequest=()=>{
       console.log('Rejecting Request: ',user);
       dispatch(cancelConnection({connectionid:user.connectionid,senderid:user.senderid}));
    }
  return (
    <>
     <Stack direction='row'  sx={{border:'1px solid black',flexBasis:'40%' ,padding:'1rem' ,transition:'all 0.3s' ,'&:hover':{
      transform:"translateY(-3px)",
      boxShadow:'1px 1px 15px grey',
      cursor:'pointer',
     }}} justifyContent='space-between' alignItems='center' >
               <Stack direction='row' gap={2} alignItems='center'>
                 <AccountCircleIcon  fontSize='large'/>
                  <Typography fontSize='1.4rem'>{user.username}</Typography>
               </Stack>
                <Stack direction='row' gap={2}  sx={{}}>
                  <Button variant='contained' sx={{backgroundColor:'green'}} onClick={acceptUserRequest}>Accept</Button>
                  <Button variant='contained' sx={{backgroundColor:'crimson'}} onClick={rejectUserRequest}>Reject</Button>
                </Stack>
            </Stack>
    </>
  )
}

export default Request;