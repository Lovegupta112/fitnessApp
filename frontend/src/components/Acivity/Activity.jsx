import { Box, IconButton, Button, Stack, Typography } from "@mui/material";
import React from "react";
import cycling from "../../../public/cycling.jpg";
import running from "../../../public/running.jpg";
import swimming from "../../../public/swimming.jpg";
import walking from "../../../public/walking.jpg";
import DeleteIcon from "@mui/icons-material/Delete";

const Activity = ({activity}) => {
  const activityInfo = { name: "cycling", distance: "12km", time: "1hr" };

  const handleClick = () => {
    console.log("activity deleted !");
  };
  return (
    <Stack sx={{
        minHeight: "330px",
        // flexBasis: "29%",
        width: "25%",
        minWidth: "300px",
        boxShadow:'1px 1px 6px grey',
        borderRadius:'10px',

    }}>
    <Stack
      sx={{
       
        "&:hover": {
          filter: "brightness(90%)",
        },
        "&:hover button": {
          visibility: "visible",
          zIndex: "10000",
        },
        overflow: "hidden",
        position: "relative",
        // borderRadius: "10px",
        // justifyContent:'space-between'
        "&:hover>div": {
            transform: "scale(1.04)",
          },
      }}
    >
      <IconButton
        aria-label="delete"
        sx={{
          color: "white",
          border: "1px solid white",
          width: "fit-content",
          visibility: "hidden",
          alignSelf: "end",
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "10000",
          "&:hover": {
            border: "1px solid red",
            color: "red",
          },
        }}
        size="small"
        onClick={handleClick}
      >
        <DeleteIcon />
      </IconButton>

      <Stack
        sx={{
          width: "100%",
          height: "230px",

          padding: "0.4rem 1rem 0.2rem",
        //   border: "1px solid red",
          backgroundImage: `url(${cycling})`,
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent: "space-between",
          transition: "all 0.2s",
        
        }}
        className="activity"
      ></Stack>
     
    </Stack>
    <Stack
      padding={2}
        sx={{
        //  position:'absolute',
        //  zIndex:333333,
         width:'100%',
         margin:'auto',
         borderRadius:'0 0 10px 10px'
        }}
      >
        <Stack direction="row" sx={{}} gap={3}>
          <Typography fontWeight='bold'>Activity: </Typography>
          <Typography>{activity.activityname}</Typography>
        </Stack>
        <Stack direction="row" sx={{}} gap={3}>
          <Typography fontWeight='bold'>Distance: </Typography>
          <Typography>{activity.distance} {activity.unit}</Typography>
        </Stack>
        <Stack direction="row" sx={{}} gap={3}>
          <Typography fontWeight='bold'>Time: </Typography>
          <Typography>{activity.time} sec</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Activity;
