import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Stack, Typography} from "@mui/material";
import Profile from "./Profile/Profile";


const Header = () => {


  return (
    <Stack
      direction="row"
      sx={{
       height:'10vh'
      }}
      alignItems="center"
      justifyContent="space-between"
      padding={1}
    >
      <Typography variant="h5" fontWeight="bold">
        FitnessApp
      </Typography>
      <Stack
        direction="row"
        gap={3}
        sx={{
          a: {
            textDecoration: "none",
            color: "black",
          },
        }}
        alignItems="center"
      >
        <Link to={"/"}>
          <Typography>Home</Typography>
        </Link>
        <Link to={"/dashboard"}>
          <Typography>Dashboard</Typography>
        </Link>
        <Link to={"/activity"}>
          <Typography>Activity</Typography>
        </Link>
        <Link to={"/performance"}>
          <Typography>Performance</Typography>
        </Link>
        <Link to={"/signup"}>
          <Typography>Signup</Typography>
        </Link>
        <Link to={"/login"}>
          <Typography>Login</Typography>
        </Link>
        {/*  hide profile if user is not login or signup ---------*/}
       <Profile/>
      </Stack>
    </Stack>
  );
};

export default Header;
