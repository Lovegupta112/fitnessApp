import { useEffect, useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentActivity,
  removeCurrentActivity,
  addActivity,
} from "../app/features/activitySlice";
import {toast} from 'react-toastify';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import {updateTimer} from '../app/features/timerSlice';

const defaultTimer = { hours: 0, min: 0, sec: 0 };
const Timer = () => {
  const [timer, setTimer] = useState(defaultTimer);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { currentActivity } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(updateTimer(false));
  },[])
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
    }, 100);
    dispatch(updateTimer(true));
  };
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };
  const resumeTimer = () => {
    startTimer();
    setIsPaused(false);
  };
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimer(defaultTimer);
    setIsPaused(false);
    dispatch(updateTimer(false));
  };
  const saveRecord = async () => {
    // console.log('timer: ',timer);
    // console.log(timer,currentActivity);
    const totalTime = calculateTime();
    dispatch(setCurrentActivity({ name: "time", value: totalTime }));
    toast.success('Activity Saved !');
    dispatch(updateTimer(false));
    dispatch(
      addActivity({ currentActivity: { ...currentActivity }, time: totalTime })
    );
  };

  const calculateTime = () => {
    return timer.hours * 3600 + timer.min * 60 + timer.sec;
  };
  return (
    <Stack gap={2} padding={2} sx={{
      width:'fit-content',
      alignItems:'center',
      // margin:'auto'
    }}>
      <Typography variant="h5" sx={{width:'fit-content', color: "#B53471" ,fontWeight:'700'}}>
        Track Your Perfomance
      </Typography>
      <Stack direction="row" gap={2}>
        <Stack alignItems="center">
          <Typography sx={{color:'grey'}}>Hours</Typography>
          <Typography sx={{fontSize:'3rem'}}>
            {timer.hours >= 10 ? timer.hours : `0${timer.hours}`} :
          </Typography>
        </Stack>
        :
        <Stack alignItems="center">
          <Typography sx={{color:'grey'}}>Min</Typography>
          <Typography sx={{fontSize:'3rem'}}>
            {timer.min >= 10 ? timer.min : `0${timer.min}`} :
          </Typography>
        </Stack>
        :
        <Stack alignItems="center">
          <Typography sx={{color:'grey'}}>Sec</Typography>
          <Typography sx={{fontSize:'3rem'}}>
            {timer.sec >= 10 ? timer.sec : `0${timer.sec}`}  
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={3}>
       
        {!isPaused ?
         (timerRef.current ?
          <Button variant="contained" sx={{backgroundColor:'#786fa6', "&:hover": {
            backgroundColor: "#786fa6",
          },}} onClick={pauseTimer}>
            Pause
          </Button>
        :
        <Button variant="contained" onClick={startTimer}>
        Start
      </Button>
        ):
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
        }
      </Stack>
      {/* {isPaused && (
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
      )} */}
    </Stack>
  );
};

export default Timer;
