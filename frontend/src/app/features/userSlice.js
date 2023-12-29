import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      // console.log('action: ',action);
      const { userid, username, email, phone } = action.payload.user;
      state.userid = userid;
      state.username = username;
      state.email = email;
      state.phone = phone;
      state.userid = userid;
    },
    login: (state, action) => {
      const {
        userid,
        username,
        email,
        phone,
        gender,
        bloodgroup,
        adharcard,
        age,
        weight,
      } = action.payload.user;
      state.userid = userid;
      state.username = username;
      state.email = email;
      state.phone = phone;
      state.gender = gender;
      state.bloodgroup = bloodgroup;
      state.adharcard = adharcard;
      state.age = age;
      state.weight = weight;
      // console.log({state});
    },
    updateUserInfo: (state, action) => {
      console.log("payload: ", action.payload);
      const {
        userid,
        username,
        email,
        phone,
        gender,
        bloodgroup,
        adharcard,
        age,
        weight,
      } = action.payload;
      state.userid = userid;
      state.username = username;
      state.email = email;
      state.phone = phone;
      state.gender = gender;
      state.bloodgroup = bloodgroup;
      state.adharcard = adharcard;
      state.age = age;
      state.weight = weight;
    },
    logout: (state, action) => {
      state = initialState;
      console.log("state: ", state);
    },
  },
});

export const { signup, login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
