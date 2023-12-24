import {useState,useEffect} from 'react';
import {Box,MenuItem,ListItemIcon,IconButton,Tooltip,Typography,Divider,Menu,Avatar, Stack} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ProfileSettings from './ProfileForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {logout} from '../../app/features/userSlice';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export default function Profile() {
  const [anchorEl, setAnchorEl] =useState(null);
  const [username,setUsername]=useState('');
  const userInfo=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
   setUsername(userInfo.username);
   console.log('running...');
  },[userInfo])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser=async ()=>{
   try{
    console.log('logout user ...');
    const res=await axios.get('/users/logout',{withCredentials:true});
    console.log(res.data);
    dispatch(logout());
    setAnchorEl(null);
    // navigate('/login');
   }
   catch(error){

   }
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40  }}>{username?.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}  sx={{
          a:{
            textDecoration:'none',
            display:'flex',
            alignItems:'center',
            color:'black',
          }
        }}>
          <Link to={"/profile"}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
            profile
        </Link>
        </MenuItem>
        <MenuItem >
         <Stack direction='row' alignItems='center' onClick={logoutUser}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
         </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}