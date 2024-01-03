import { Button, Stack, Typography } from '@mui/material';
import Request from './Request';
import { useSelector,useDispatch } from 'react-redux';




const Requests = () => {

  const {users}=useSelector((state)=>state.connection);
  const  currentUser=useSelector((state)=>state.user);


  console.log('users: ',users);
  

   const requestList=users.filter((userObj)=>userObj.connectionid===currentUser.userid && userObj.acceptedrequest!==true && userObj.acceptedrequest!==null);

  return (
    <Stack gap={2}>
        <Typography>Requests</Typography>
         <Stack direction='row' gap={2}  flexWrap='wrap'>
          {requestList.map(((request,index)=>( 
            <Request key={request.userid+''+index} user={request}/>
          )))}
         </Stack>
    </Stack>
  )
}

export default Requests;