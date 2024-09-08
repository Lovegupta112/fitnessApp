const { Pool } = require("pg");
const fsPromise = require("fs").promises;
const path = require("path");
require("dotenv").config();

// const pool = new Pool({
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });
const pool = new Pool({
 connectionString:process.env.POSTGRES_URL
});

pool.on("connect", () => {
  console.log("connected to the Database");
});

async function setUpTable() {
  try {
    const filePath = path.join(__dirname, "..", "util", "tables.sql");
    const sql = await fsPromise.readFile(filePath, "utf-8");
    // console.log(sql);
    await query(sql);
  } catch (error) {
    console.log(error);
  }
}
setUpTable();

async function query(text, arr = []) {
  try {
    const res = await pool.query(text, arr);
    return res;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

module.exports = {  query };
