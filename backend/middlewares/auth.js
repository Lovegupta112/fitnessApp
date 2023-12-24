require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, SECRET_KEY, (error, user) => {
        if (error) {
          return res.status(401).json({ message: "Unauthorized User" });
        }
        console.log("verify", user);
        req.userid = user.id;
        next();
      });
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
