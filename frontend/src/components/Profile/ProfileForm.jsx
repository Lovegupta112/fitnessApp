import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../app/features/userSlice";
import {toast} from 'react-toastify';
import { validateEmail,validatePhoneNumber ,validateBloodgroup } from "../../util/validation";
// import './style.css';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const defaultUser = {
  userid: 0,
  username: "",
  email: "",
  phone: "",
  gender: "",
  bloodgroup: "",
  adharcard: "",
  age: 0,
  weight: 0,
};
const ProfileForm = () => {
  const [userInfo, setUserInfo] = useState(defaultUser);
  const [err, setErr] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let userData = {};
    for (let info in user) {
      let value = user[info];
      if (value) {
        userData[info] = value;
      }
    }
    setUserInfo({ ...userInfo, ...userData });
    // setUserInfo(user);
  }, [user]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErr("");
    if (name === "username") {
      setUserInfo({ ...userInfo, username: value });
    } else if (name === "email") {
      setUserInfo({ ...userInfo, email: value });
    } else if (name === "phone") {
      setUserInfo({ ...userInfo, phone: value });
    } else if (name === "gender") {
      setUserInfo({ ...userInfo, gender: value });
    } else if (name === "bloodgroup") {
      setUserInfo({ ...userInfo, bloodgroup: value });
    } else if (name === "adharcard") {
      setUserInfo({ ...userInfo, adharcard: value });
    } else if (name === "age") {
      setUserInfo({ ...userInfo, age: value });
    } else if (name === "weight") {
      setUserInfo({ ...userInfo, weight: value });
    }
    setErr("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    setApiError("");
    // console.log('api calling');
    if (
      !userInfo.username.trim() ||
      !userInfo.email.trim() ||
      !userInfo.phone.trim() ||
      // !userInfo.gender ||
      !userInfo.age ||
      !userInfo.weight ||
      !userInfo.bloodgroup ||
      !userInfo.adharcard ||
      userInfo.adharcard.length != 12 ||
      isNaN(userInfo.adharcard)
    ) {
      setErr("error");
      return;
    }
    if(userInfo.email && !validateEmail(userInfo.email.trim())){
      setErr('invalidEmail');
      return;
    }
    if(userInfo.phone && !validatePhoneNumber(userInfo.phone.trim())){
      setErr('invalidPhone');
      return;
    }
    if(userInfo.bloodgroup && !validateBloodgroup(userInfo.bloodgroup)){
      setErr('bloodgroup');
      return;
    }
    // setErr("");
    // console.log({userInfo});
    try {
      console.log('api calling');
      const res = await axios.put("/users/updateInfo", userInfo);
      console.log(res?.data);
      dispatch(updateUserInfo(res?.data?.user));
      toast.success("Profile Updated !");
    } catch (error) {
      console.log("Error: ", error);
      // setErr(error?.response?.data?.Error);
      // setApiError(error?.response?.data?.Error);
      if(error?.response?.data?.data){
        setApiError(error?.response?.data?.data[0])
      }
      else if(error?.response?.data?.message){
         const errMsg=error?.response?.data?.message.split(" ");
         const errorType=errMsg[errMsg.length-1];
         console.log(errorType);
         let customError='';
         if(errorType==='"users_adharcard_key"'){
          customError=`${userInfo.adharcard} Adharcard no Already Exist !`;
         }
         else if(errorType==='"users_email_key"'){
          customError=`${userInfo.email} email id Already Exist !`
         }
         else {
          customError=error?.response?.data?.message;
         }
         console.log(customError);
        setApiError(customError);
      }
      else{
        setApiError(error?.response?.data?.Error);
      }
      throw error;
    }
    // navigate("/activity");
  };
  console.log(apiError);

  return (
    <Stack
      className="signup-Container"
      sx={{
        width: "100%",
        padding: "2rem",
        form: {
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        },
      }}
      gap={2}
    >
      <form method="post" onSubmit={handleSubmit}>
        <Stack direction="row" gap={6}>
          <Stack gap={1}>
            <label htmlFor="username">Name</label>
            <TextField
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your name"
              value={userInfo.username}
              onChange={handleChange}
              error={err && !userInfo.username ? true : false}
              helperText={
                err && !userInfo.username ? "Please Fill the name !" : ""
              }
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
              error={((err && !userInfo.email) || (err && err==='invalidEmail')) ? true : false}
              helperText={
                ((err && !userInfo.email) || (err && err==='invalidEmail')) ? "Please Fill the Valid email !" : ""
              }
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
              error={ ((err && !userInfo.phone) || (err && err==='invalidPhone'))? true : false}
              helperText={
                ((err && !userInfo.phone) || (err && err==='invalidPhone')) ? "Please Fill the Correct phone No!" : ""
              }
            />
          </Stack>
        </Stack>
        <hr />
        <Stack direction="row" gap={8} alignItems="center">
          <Stack gap={1}>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}

            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
               
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Stack>
          <Stack gap={1}>
            <label htmlFor="bloodgroup">Blood Group</label>
            <TextField
              type="text"
              id="bloodgroup"
              name="bloodgroup"
              placeholder="Enter your Blood Group"
              value={userInfo.bloodgroup}
              onChange={handleChange}
              error={((err && !userInfo.bloodgroup) || (err && err==='bloodgroup'))  ? true : false}
              helperText={
                (err && !userInfo.bloodgroup) || (err && err==='bloodgroup')
                  ? "Please Fill Correct Blood group !"
                  : ""
              }
            />
          </Stack>
          <Stack gap={1}>
            <label htmlFor="adharcard">Adhar Card No</label>
            <TextField
              type="text"
              id="adharcard"
              name="adharcard"
              placeholder="Enter Your Adhar Card No"
              value={userInfo.adharcard}
              onChange={handleChange}
              error={
                err && (!userInfo.adharcard || userInfo.adharcard.length != 12)
                  ? true
                  : false
              }
              helperText={
                err && (!userInfo.adharcard || userInfo.adharcard.length != 12)
                  ? "Please Fill Right AdharCard No"
                  : ""
              }
            />
          </Stack>
        </Stack>
        <hr />
        <Stack direction="row" gap={4}>
          <Stack gap={1}>
            <label htmlFor="age">Age</label>
            <TextField
              type="number"
              id="age"
              name="age"
              placeholder="Enter your Age"
              value={userInfo.age}
              onChange={handleChange}
              error={err && !userInfo.age ? true : false}
              helperText={err && !userInfo.age ? "Please Fill the age !" : ""}
            />
          </Stack>
          <Stack gap={1}>
            <label htmlFor="weight">Weight</label>
            <TextField
              type="number"
              id="weight"
              name="weight"
              placeholder="Enter Your Weight"
              value={userInfo.weight}
              onChange={handleChange}
              error={err && !userInfo.weight ? true : false}
              helperText={
                err && !userInfo.weight ? "Please Fill the weight !" : ""
              }
            />
          </Stack>
        </Stack>
        <Typography color="red">{apiError}</Typography>

        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "fit-content",
            padding: "0.5rem 2rem",
          }}
        >
          Save
        </Button>
      </form>
    </Stack>
  );
};

export default ProfileForm;
