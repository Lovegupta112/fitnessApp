import {useState} from 'react';
import { Stack, Typography,Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { cancelConnection,addCurrentConnectionDetails } from '../../app/features/connectionSlice';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

const Connections = () => {

    const dispatch=useDispatch();
    const {users}=useSelector((state)=>state.connection);
    const currentUser=useSelector((state)=>state.user);
    const navigate=useNavigate();
    

    console.log('users: ',users);
    const connectionList=users.filter((userObj)=>(userObj.connectionid===currentUser.userid || userObj.senderid===currentUser.userid )&& userObj.acceptedrequest===true);
    
    const removeConnection=(connection)=>{
        console.log('Removing connection: ',connection);
        dispatch(cancelConnection({connectionid:connection.connectionid,senderid:connection.senderid}));
        toast.success('Connection Removed  SuccessFully !');
    }

    const showActivities=(connection)=>{
      console.log('showing activities ...',connection);
      dispatch(addCurrentConnectionDetails(connection));
      navigate(`/dashboard/${connection.userid}`);
    }
  return (
    <Stack gap={2}>
        <Typography>Connections</Typography>
       <Stack direction='row' gap={2} flexWrap='wrap' >
       {connectionList.map((connection,index)=>(
              <Stack key={index} direction='row'  sx={{border:'1px solid black',flexBasis:'40%' ,padding:'1rem' ,transition:'all 0.3s' ,'&:hover':{
                transform:"translateY(-3px)",
                boxShadow:'1px 1px 15px grey',
                cursor:'pointer',
               }}} justifyContent='space-between' alignItems='center' >
                         <Stack direction='row' gap={2} alignItems='center'onClick={()=>showActivities(connection)}>
                           <AccountCircleIcon  fontSize='large'/>
                            <Typography fontSize='1.4rem'>{connection.username}</Typography>
                         </Stack>
                          <Stack direction='row' gap={2}  sx={{}}>
                            <Button variant='contained' sx={{backgroundColor:'crimson'}}
                            onClick={()=>removeConnection(connection)}>Remove Connection</Button>
                          </Stack>
                      </Stack>
        ))}
       </Stack>
    </Stack>
  )
}

export default Connections;