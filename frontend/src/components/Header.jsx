import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Stack ,Typography } from '@mui/material';

const Header = () => {
  return (
    <Stack direction='row' sx={{
      lineHeight:'3'
    }}
    alignItems='center'
    justifyContent='space-between'
    padding={1}
    >
        <Typography variant='h5' fontWeight='bold'>FitnessApp</Typography>
         <Stack direction='row' gap={3} sx={{
           'a':{
            textDecoration:'none',
            color:'black'
           }
         }} 
          alignItems='center'
         >
           <Link to={'/'}><Typography>Home</Typography></Link>
           <Link to={'/dashboard'}><Typography>Dashboard</Typography></Link>
           <Link to={'/activity'}><Typography>Activity</Typography></Link>
           <Link to={'/performance'}><Typography>Performance</Typography></Link>
           <Link to={'/signup'}><Typography>Signup</Typography></Link>
           <Link to={'/login'}><Typography>Login</Typography></Link>
           <Link to={'/profile'}>
            <IconButton size='medium' aria-label='user-profile'  sx={{
              border:'1px solid lightgrey'
            }}>LG</IconButton>
           </Link>
         </Stack>
    </Stack>
  )
}

export default Header;