import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Session = ({ info }) => {
  const [join, setJoin] = useState(false);
  const [expired, setExpired] = useState(false);

  const { sessionList } = useSelector((state) => state.mentorship);

  // const

  useEffect(() => {
    checkTime();
  }, []);
  useEffect(() => {
    checkTime();
  }, [sessionList, info]);

  // console.log("info: ", info);

  function checkTime() {
    setJoin(false);
    setExpired(false);
    const prevYear = new Date(info.session_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const prevMonth = new Date(info.session_date).getMonth();
    const currentMonth = new Date().getMonth();
    const prevDate = new Date(info.session_date).getDate();
    const currentDate = new Date().getDate();
    const prevHour = Number(info?.session_time?.split(":")[0]) + 1;
    const currentHour = new Date().getHours();
    const prevMinutes = Number(info?.session_time?.split(":")[1]);
    const currentMinutes = new Date().getMinutes();

    if (
      prevYear <= currentYear &&
      prevMonth <= currentMonth &&
      prevDate < currentDate
    ) {
      // console.log("checking ..");
      setExpired(true);
    } else if (
      prevYear <= currentYear &&
      prevMonth === currentMonth &&
      prevDate === currentDate &&
      prevHour < currentHour
    ) {
      // console.log("Checking with same date ");
      setExpired(true);
    } else if (
      prevYear <= currentYear &&
      prevMonth === currentMonth &&
      prevDate === currentDate &&
      prevHour === currentHour &&
      prevMinutes < currentMinutes
    ) {
      // console.log("Checking with same hour ");
      setExpired(true);
    }
  }

  function checkJoinTime() {
    const hour = Number(info?.session_time?.split(":")[0]);
    const minutes = Number(info?.session_time?.split(":")[1]);
    const validTillHour = Number(info?.session_time?.split(":")[0]) + 1;
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    console.log(hour, validTillHour, currentHour,' min: ',minutes,currentMinutes);
    if (
      hour <= currentHour &&
      currentHour <= validTillHour &&
      minutes >= currentMinutes
    ) {
      console.log("joining ....");
      return true;
    } else {
      console.log("expired ...");
      return false;
    }
  }

  const isItJoiningTime = checkJoinTime();

  function joinSession() {
    window.open("http://meet.google.com/new");
  }
  return (
    <Stack
      direction="row"
      sx={{
        border: "1px solid black",
        "&:hover": {
          boxShadow: "1px 1px 10px grey",
          cursor: "pointer",
          // transform:'scale(10px)',
        },
      }}
      padding={3}
      gap={10}
      alignItems="center"
    >
      <Typography>
        <strong>Session Date: </strong> {info.session_date}{" "}
      </Typography>
      <Typography>
        <strong>Session Time: </strong> {info.session_time}{" "}
      </Typography>
      <Typography>
        <strong>Valid Till: </strong> 1 Hour{" "}
      </Typography>

      {expired ? (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "crimson",
              "&:hover": {
                backgroundColor: "crimson",
              },
            }}
            disabled={true}
          >
            Cancel Session
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#637e7f",
              "&:hover": {
                backgroundColor: "#637e7f",
              },
            }}
          >
            Expired Session
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "crimson",
              "&:hover": {
                backgroundColor: "crimson",
              },
            }}
            disabled={false}
          >
            Cancel Session
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1dd1a1",
              "&:hover": {
                backgroundColor: "#1dd1a1",
              },
            }}
            onClick={() => {
              isItJoiningTime && joinSession();
            }}
          >
            {isItJoiningTime ? "Join Session" : "Active Session"}
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Session;
