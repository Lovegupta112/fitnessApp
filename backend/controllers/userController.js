const { query } = require("../config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const {
  getUserInfoUsingEmailQuery,
  signupQuery,
  updateUserInfoQuery,
  getUserInfoUsingUseridQuery,
} = require("../util/queries");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existUser = await query(getUserInfoUsingEmailQuery, [email]);

    if (existUser.rows.length > 0) {
      return res
        .status(400)
        .json({ Error: `User Already Exist with email ${email}!` });
    }

    const newUser = await query(signupQuery, [
      name,
      email,
      phone,
      hashedPassword,
    ]);
    console.log("SuccessFully signup : ", newUser.rows[0]);
    const token = jwt.sign({ id: newUser.rows[0].userid, email }, SECRET_KEY);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60 * 60),
      httpOnly: true,
    });
    res.status(201).json({ user: newUser.rows[0], token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await query(getUserInfoUsingEmailQuery, [email]);
    if (existUser.rows.length <= 0) {
      return res.status(404).json({ message: "User not found !" });
    }
    const matchPassword = await bcrypt.compare(
      password,
      existUser.rows[0].password
    );
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials !" });
    }
    const token = jwt.sign(
      { id: existUser.rows[0].userid, email: existUser.rows[0].email },
      SECRET_KEY
    );
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 60 * 60),
    //   httpOnly: true,
    // });
    res.status(200).json({ user: existUser.rows[0], token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      gender,
      bloodgroup,
      adharcard,
      age,
      weight,
      userid,
    } = req.body;
    const updateUser = await query(updateUserInfoQuery, [
      username,
      email,
      phone,
      gender,
      bloodgroup,
      adharcard,
      age,
      weight,
      userid,
    ]);
    console.log(updateUser.rows[0]);
    res.status(200).json({
      message: `update user with email ${email}`,
      user: updateUser.rows[0],
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).clearCookie("jwt").send("logout");
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userid = req.userid;
    const userInfo = await query(getUserInfoUsingUseridQuery, [userid]);
    console.log("userInfo: ", userInfo.rows[0]);
    res.status(200).json(userInfo.rows[0]);
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(401);
  }
};

module.exports = { signup, login, updateUserInfo, logout, getUserInfo };
