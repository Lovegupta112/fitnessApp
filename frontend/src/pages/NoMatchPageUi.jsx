import { Button, Stack } from '@mui/material'
import React from 'react';
import notFound from '../../public/notFound.jpg';
import { useNavigate } from 'react-router-dom';

const NoMatchPageUi = () => {
    const navigate=useNavigate();

  return (
    <Stack  padding={3}
    gap={2}
    sx={{
      paddingTop:'15vh'
    }} alignItems='center'>
<img src={notFound} alt="Not Found pic" width='60%' />
<Button variant='contained'  onClick={()=>navigate('/dashboard')}>Go Back</Button>
    </Stack>
  )
}

export default NoMatchPageUi