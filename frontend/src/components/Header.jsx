import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Stack, Typography } from "@mui/material";
import Profile from "./Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication } from "../app/features/authSlice";
import { logout, updateUserInfo } from "../app/features/userSlice";
import { fetchActivities } from "../app/features/activitySlice";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(isAuthenticated);
  useEffect(() => {
    // if (getJWTToken()) {
    //   setIsAuthenticated(true);
    //   return;
    // } else {
    //   setIsAuthenticated(false);
    // }
    dispatch(checkAuthentication());
    console.log("auth: ", auth);
    if (!auth.isAuthenticated) {
      dispatch(logout());
      setIsAuthenticated(false);
      return;
    } else {
      setIsAuthenticated(true);

      dispatch(fetchActivities());
      getUserInfo();
    }
  }, [auth]);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const res = await axios.get("/users/userInfo", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch(updateUserInfo(res.data));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        height: "10vh",
        backgroundColor: "black",
        boxShadow: "2px 2px 10px grey",
        color: "white",
        position:'fixed',
        width:'100%',
        top:0,
        zIndex:'99999',
      }}
      alignItems="center"
      justifyContent="space-between"
      padding={2}
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
            color: "white",
          },
        }}
        alignItems="center"
      >
        <Link to={"/"}>
          <Typography>Home</Typography>
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
            <Link to={"/dashboard"}>
              <Typography>Dashboard</Typography>
            </Link>
            <Link to={"/activity"}>
              <Typography>Activity</Typography>
            </Link>
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
