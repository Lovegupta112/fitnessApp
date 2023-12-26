import { useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from 'axios';
import { useSelector ,useDispatch } from "react-redux";
import { setCurrentActivity } from "../app/features/activitySlice";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const defaultTimer = { hours: 0, min: 0, sec: 0 };
const Timer = () => {
  const [timer, setTimer] = useState(defaultTimer);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const {currentActivity}=useSelector((state)=>state.activity);
  const dispatch=useDispatch();

  console.log(timer,currentActivity);
  const run = () => {
    setTimer((prevTimer) => {
      let h = prevTimer.hours,
        m = prevTimer.min,
        s = prevTimer.sec;

      if (m === 60) {
        h++;
        m = 0;
      }
      if (s === 60) {
        m++;
        s = 0;
      }
      s++;
      return { hours: h, min: m, sec: s };
    });
  };
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      run();
    }, 1000);
  };
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };
  const resumeTimer = () => {
    startTimer();
  };
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimer(defaultTimer);
    setIsPaused(false);
  };
  const saveRecord=async()=>{
    console.log('timer: ',timer);
    const totalTime=calculateTime();
    console.log('totalTime(sec): ',totalTime);
   try{
      
       const token=localStorage.getItem('jwt-token');
       dispatch(setCurrentActivity({name:'time',value:totalTime}))
       const res=await axios.post('/activity/save',{...currentActivity,time:totalTime},{
        headers:{
          'Authorization':`Bearer ${token}`
        }
       });
       console.log(res.data);
   }
   catch(error){
    console.log('Error:',error);
    throw error;
   }
  }

  const calculateTime=()=>{
    return timer.hours*3600+timer.min*60+timer.sec;
  }
  return (
    <Stack
      gap={2}
      sx={{
        boxShadow: "1px 1px 5px grey",
      }}
      padding={3}
    >
      <Button
        sx={{ width: "fit-content", backgroundColor: "#B53471" }}
        variant="contained"
      >
        {" "}
        Start Timer
      </Button>
      <Stack direction="row" gap={2}>
        <Stack alignItems="center">
          <Typography>Hours</Typography>
          <Typography>
            {timer.hours >= 10 ? timer.hours : `0${timer.hours}`}
          </Typography>
        </Stack>
        :
        <Stack alignItems="center">
          <Typography>Min</Typography>
          <Typography>
            {timer.min >= 10 ? timer.min : `0${timer.min}`}
          </Typography>
        </Stack>
        :
        <Stack alignItems="center">
          <Typography>Sec</Typography>
          <Typography>
            {timer.sec >= 10 ? timer.sec : `0${timer.sec}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={3}>
        <Button variant="contained" onClick={startTimer}>
          Start
        </Button>
        {timerRef.current && (
          <Button variant="contained" onClick={pauseTimer}>
            Pause
          </Button>
        )}
      </Stack>
      {isPaused && (
        <Stack direction="row" gap={3}>
          <Button
            variant="contained"
            onClick={resumeTimer}
            sx={{
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "green",
              },
            }}
          >
            Resume
          </Button>
          <Button
            variant="contained"
            onClick={resetTimer}
            sx={{
              backgroundColor: "crimson",
              "&:hover": {
                backgroundColor: "crimson",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={saveRecord}
            sx={{
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "orange",
              },
            }}
          >
            Save Record
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Timer;
