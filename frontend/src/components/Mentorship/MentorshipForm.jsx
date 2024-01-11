import { useState, useEffect } from "react";
import { Button, Input, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { bookSession } from "../../app/features/mentorshipSlice";

const MentorshipForm = () => {
  const [sessionInfo, setSessionInfo] = useState({
    time: "",
    date: "",
  });
  const [err, setErr] = useState(null);

  const { sessionList } = useSelector((state) => state.mentorship);

  const dispatch = useDispatch();
  console.log("sessionList: ", sessionList);

  const handleSession = (e) => {
    console.log(e.target.name);
    const name = e.target.name;
    if (name === "date") {
      setSessionInfo({ ...sessionInfo, date: e.target.value });
    } else if (name === "time") {
      setSessionInfo({ ...sessionInfo, time: e.target.value });
    }
    setErr("");
  };

  const bookNewSession = () => {
    setErr("");

    if (!sessionInfo.date) {
      setErr("Please Select Any Date !");
      return;
    }
    if (!sessionInfo.time) {
      setErr("Please Select Any Time !");
      return;
    }
    if (!compareTime()) {
      setErr("Please Select Future Time or Date !");
      return;
    }
    if (checkAnySessionExist()) {
      setErr("Active Session Exist !");
      return;
    }
    console.log(sessionInfo);
    toast.success("Fitness Mentorship session has booked !");
    setErr("");
    dispatch(bookSession(sessionInfo));
  };

  function checkAnySessionExist() {
    let res = false;
    sessionList.forEach((session) => {
      console.log("session: ", session);

      // const selectedDateTime=new Date(sessionInfo.date).getTime();
      // console.log('selected info: ',sessionInfo);
      // console.log('prev: ',prevDateTime,' selected: ',selectedDateTime);
      let prevHour = Number(session?.session_time?.split(":")[0]) + 1;
      prevHour = prevHour === 24 ? 1 : prevHour;
      const prevMinutes = Number(session?.session_time?.split(":")[1]);
      console.log("prevhourmin: ", prevHour, prevMinutes);
      const prevDateTime = new Date(
        `${session.session_date} ${prevHour}:${prevMinutes}`
      ).getTime();
      let selectedHour = Number(sessionInfo?.time?.split(":")[0]);
      // selectedHour=selectedHour===24?1:selectedHour;
      const selectedMinutes = Number(sessionInfo?.time?.split(":")[1]);
      console.log("selectedhourmin: ", selectedHour, selectedMinutes);
      const selectedDateTime = new Date(
        `${sessionInfo.date} ${selectedHour}:${selectedMinutes}`
      ).getTime();
      // if(prevDateTime>=selectedDateTime && prevTime>=selectedTime){
      // return  res= true;
      // }
      console.log(
        " prevTime: ",
        prevDateTime,
        " selectedTime: ",
        selectedDateTime
      );
      if (prevDateTime >= selectedDateTime) {
        return (res = true);
      }
    });
    console.log("res: ", res);
    return res;
  }

  function compareTime() {
    const currentTime = Date.now();
    const selectedTime = new Date(
      `${sessionInfo.date} ${sessionInfo.time}`
    ).getTime();
    // console.log(selectedTime,currentTime ,selectedTime>currentTime);
    return selectedTime > currentTime;
  }

  return (
    <Stack
      sx={{
        border: "1px solid black",
        boxShadow: "1px 1px 10px grey",
      }}
      gap={4}
      padding={6}
    >
      <Typography variant="h5" color="royalblue">
        Mentorship Session Form
      </Typography>
      <Stack>
        <label htmlFor="date">Mentorship Date</label>
        <Input
          type="date"
          id="date"
          name="date"
          onChange={(e) => handleSession(e)}
          error={err && sessionInfo.date === "" ? true : false}
        />
      </Stack>
      <Stack>
        <label htmlFor="time">Mentorship Timing</label>
        <Input
          type="time"
          id="time"
          name="time"
          onChange={(e) => handleSession(e)}
          error={err && sessionInfo.time === "" ? true : false}
        />
      </Stack>
      <Typography variant="h6" color="crimson">
        {err}
      </Typography>
      <Button variant="contained" onClick={bookNewSession}>
        Book Session
      </Button>
    </Stack>
  );
};

export default MentorshipForm;
