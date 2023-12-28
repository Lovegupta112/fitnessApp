const getUserInfoUsingEmailQuery = `SELECT * FROM users WHERE users.email=$1`;

const signupQuery = `INSERT INTO users (username,email,phone,password) VALUES($1,$2,$3,$4) RETURNING *;`;

const updateUserInfoQuery = ` UPDATE users
SET username=$1 , email=$2 , phone=$3,gender=$4,bloodgroup=$5,adharcard=$6,age=$7,weight=$8
WHERE userid=$9 RETURNING *
`;

const getUserInfoUsingUseridQuery = `SELECT * FROM users WHERE userid=$1;`;

const addActivityQuery = `INSERT INTO activity (activityName,distance,time,unit,userid) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

const getUserActivityQuery = `SELECT * FROM activity WHERE activity.userid=$1`;

const deleteUserActivityQuery = `DELETE FROM activity WHERE activityid=$1`;

const setDashboardActivityStatusQuery = `UPDATE activity SET dashboardStatus=$1 WHERE activityid=$2 RETURNING *`;

module.exports = {
  getUserInfoUsingEmailQuery,
  signupQuery,
  updateUserInfoQuery,
  getUserInfoUsingUseridQuery,
  addActivityQuery,
  getUserActivityQuery,
  deleteUserActivityQuery,
  setDashboardActivityStatusQuery,
};
