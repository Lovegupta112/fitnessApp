import {useEffect, useState} from "react";
import { Stack, Typography ,Box,Button} from "@mui/material";
import fitness from '../../public/fitness.jpg';
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    checkAuthentication();
  },[]);
  const checkAuthentication=()=>{
    const token=localStorage.getItem('jwt-token');
    if(!token){
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  }
  const handleClick=()=>{
    if(isAuthenticated){
      navigate('/dashboard');
    }
    else{
      navigate('/login');
    }
  }
  return (
    <Stack  sx={{
      minHeight: "calc(100vh - 10vh)",
      paddingTop:'10vh'
    }}
    padding={2}
    gap={2}
    alignItems='center'
    >
    <Stack sx={{flexBasis:'50%',padding:'3rem 0 2rem 0',alignItems:'center'}}gap={2}>
  <Typography fontSize={40} sx={{
    fontWeight:'400',
    fontFamily:'Rubik Doodle Shadow'
  }}>  The only bad workout is no workout.</Typography>
      <Typography  fontSize={55}  sx={{
        paddingLeft:'1rem',
        fontFamily:'Rubik Doodle Shadow',
        fontWeight:'bold'
      }}>Fight to be fit</Typography>
    </Stack>
 
      <Button variant="contained" sx={{width:'fit-content',padding:'0.6rem 4rem',backgroundColor:'black','&:hover':{
        backgroundColor:'grey'
      }}} onClick={handleClick}>{isAuthenticated?'Dashboard':'Login'}</Button>
 
    <Stack sx={{
      width:'100%'
     }}>
     <img src={fitness} alt='fitness-pic' width='100%'/>
     </Stack>
    </Stack>
  );
};

export default Homepage;
