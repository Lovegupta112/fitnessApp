import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch ,useSelector } from "react-redux";
import { login } from "../app/features/userSlice";
import { setAuthentication } from "../app/features/authSlice";
import {toast} from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const defaultValue = {
  email: "",
  password: "",
};
const Login = () => {
  const [loginInfo, setLoginInfo] = useState(defaultValue);
  const [isVisible, setIsVisible] = useState(false);
  const [err, setErr] = useState("");
  const user=useSelector((state)=>state.user);
  // console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    setErr("");
    if (!loginInfo.email.trim()) {
      setErr(" ");
      return;
    }
    if (!loginInfo.password.trim()) {
      setErr(" ");
      return;
    }

    setLoginInfo(loginInfo);
    try {
      const res = await axios.post("/users/login", loginInfo, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success("Login SuccessFully !");
      dispatch(login(res.data));
      dispatch(setAuthentication(res.data.token));
    } catch (error) {
      console.log("Error: ", error);
      if(error?.response?.data?.data){
        setErr(error?.response?.data?.data[0])
      }
      else{
        setErr(error?.response?.data.message);
      }
      throw error;
    }

    navigate("/dashboard");
  };
  return (
    <Stack
      sx={{
        border: "2px solid black",
        width: "40%",
        padding: "2rem",
        margin: "3rem auto",
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
        LOGIN
      </Typography>
      <Stack gap={1}>
        <label htmlFor="email">Email</label>
        <TextField
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your email"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          error={err && !loginInfo.email ? true : false}
          helperText={err && !loginInfo.email ? "Please Fill the email !" : ""}
        />
      </Stack>
      <Stack gap={1}>
        <label htmlFor="password">Password</label>
        <TextField
          type={isVisible ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Enter Your password"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          error={err && !loginInfo.password ? true : false}
          helperText={
            err && !loginInfo.password ? "Please Fill the password !" : ""
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
      <Stack gap={2}>
        <Typography color="red">{err}</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f9ca24",
            "&:hover": {
              backgroundColor: "none",
            },
          }}
          onClick={loginUser}
        >
          Login
        </Button>
        <Button variant="outlined" onClick={() => navigate("/signup")}>
          New User ? Signup
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
