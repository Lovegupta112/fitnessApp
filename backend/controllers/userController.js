const { query } = require("../config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existUser = await query(`SELECT * FROM users WHERE users.email=$1`, [
      email,
    ]);

    if (existUser.rows.length > 0) {
      return res
        .status(400)
        .json({ Error: `User Already Exist with email ${email}!` });
    }

    const newUser = await query(
      `INSERT INTO users (username,email,phone,password) VALUES($1,$2,$3,$4) RETURNING *;`,
      [name, email, phone, hashedPassword]
    );
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
    const existUser = await query(`SELECT * FROM users WHERE users.email=$1`, [
      email,
    ]);
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
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60 * 60),
      httpOnly: true,
    });
    res.status(200).json({ user: existUser.rows[0], token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
