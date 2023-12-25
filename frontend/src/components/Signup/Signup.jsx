import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./style.css";
import { useDispatch } from "react-redux";
import { signup } from "../../app/features/userSlice";
import { setAuthentication } from "../../app/features/authSlice";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
const defaultUser = {
  name: "",
  email: "",
  phone: "",
  password: "",
};
const Signup = () => {
  const [userInfo, setUserInfo] = useState(defaultUser);
  const [isVisible, setIsVisible] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "username") {
      setUserInfo({ ...userInfo, name: value });
    } else if (name === "email") {
      setUserInfo({ ...userInfo, email: value });
    } else if (name === "phone") {
      setUserInfo({ ...userInfo, phone: value });
    } else if (name === "password") {
      setUserInfo({ ...userInfo, password: value });
    }
    setErr("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.target);
    setErr("");
    if (!userInfo.name.trim()) {
      setErr(" ");
      return;
    }
    if (!userInfo.email.trim()) {
      setErr(" ");
      return;
    }
    if (!userInfo.phone.trim()) {
      setErr(" ");
      return;
    }
    if (!userInfo.password.trim()) {
      setErr(" ");
      return;
    }

    console.log(userInfo);
    setUserInfo(defaultUser);
    try {
      // const res = await axios.post("/users/signup", userInfo,{withCredentials:true});
      const res = await axios.post("/users/signup", userInfo);
      console.log(res.data);
      dispatch(signup(res.data));
      dispatch(setAuthentication(res.data.token));
    } catch (error) {
      console.log("Error: ", error);
      setErr(error?.response.data.Error);
      throw error;
    }
    navigate("/dashboard");
  };

  return (
    <Stack
      className="signup-Container"
      sx={{
        border: "2px solid black",
        width: "50%",
        padding: "2rem",
        margin: "2rem auto",
        boxShadow: "1px 1px 10px grey",
      }}
      gap={2}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        SIGNUP
      </Typography>
      <form method="post" onSubmit={handleSubmit}>
        <Stack gap={1}>
          <label htmlFor="username">Name</label>
          <TextField
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your name"
            value={userInfo.name}
            onChange={handleChange}
            error={err && !userInfo.name ? true : false}
            helperText={err && !userInfo.name ? "Please Fill the name !" : ""}
          />
        </Stack>
        <Stack gap={1}>
          <label htmlFor="email">Email</label>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your email"
            value={userInfo.email}
            onChange={handleChange}
            error={err && !userInfo.email ? true : false}
            helperText={err && !userInfo.email ? "Please Fill the email !" : ""}
          />
        </Stack>
        <Stack gap={1}>
          <label htmlFor="phone">Phone No</label>
          <TextField
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Your phone"
            value={userInfo.phone}
            onChange={handleChange}
            error={err && !userInfo.phone ? true : false}
            helperText={err && !userInfo.phone ? "Please Fill the phone !" : ""}
          />
        </Stack>
        <Stack gap={1}>
          <label htmlFor="password">Password</label>
          <TextField
            type={isVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter Your password"
            value={userInfo.password}
            onChange={handleChange}
            error={err && !userInfo.password ? true : false}
            helperText={
              err && !userInfo.password ? "Please Fill the password !" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setIsVisible(isVisible ? false : true)}
                >
                  {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Typography color="red">{err}</Typography>
        <Button variant="contained" type="submit">
          Signup
        </Button>
      </form>
      <Button variant="outlined" onClick={() => navigate("/login")}>
        Already Exist? Login
      </Button>
    </Stack>
  );
};

export default Signup;
