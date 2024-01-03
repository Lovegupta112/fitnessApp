import {useState} from 'react';
import PropTypes from 'prop-types';
import { Stack ,Box,Typography,Tabs,Tab} from '@mui/material';
import Users from '../components/Users/Users';
import Requests from '../components/Requests/Requests';
import Connections from '../components/Connections/Connections';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{
        // border:'1px solid red',
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 , minHeight:'80vh'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Stack>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CommunityPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',border:'1px solid green',marginTop:'10vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
           display:'flex',
        }}>
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="My Connections" {...a11yProps(1)} />
          <Tab label="Requests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel component='div'  value={value} index={0}>
        <Users/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <Connections />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Requests />
      </CustomTabPanel>
    </Box>
  );
}
