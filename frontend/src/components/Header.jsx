import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Stack, Typography } from "@mui/material";
import Profile from "./Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication } from "../app/features/authSlice";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (getJWTToken()) {
    //   setIsAuthenticated(true);
    //   return;
    // } else {
    //   setIsAuthenticated(false);
    // }
    dispatch(checkAuthentication());
    // console.log('auth: ',auth);
    if (!auth.isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [auth]);
  return (
    <Stack
      direction="row"
      sx={{
        height: "10vh",
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

        {!isAuthenticated ? (
          <>
            <Link to={"/signup"}>
              <Typography>Signup</Typography>
            </Link>
            <Link to={"/login"}>
              <Typography>Login</Typography>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/performance"}>
              <Typography>Performance</Typography>
            </Link>
            <Profile />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
