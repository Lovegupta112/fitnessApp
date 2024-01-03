const getUserInfoUsingEmailQuery = `SELECT * FROM users WHERE users.email=$1`;

const signupQuery = `INSERT INTO users (username,email,phone,password) VALUES($1,$2,$3,$4) RETURNING *;`;

const updateUserInfoQuery = ` UPDATE users
SET username=$1 , email=$2 , phone=$3,gender=$4,bloodgroup=$5,adharcard=$6,age=$7,weight=$8
WHERE userid=$9 RETURNING *
`;

const getUserInfoUsingUseridQuery = `SELECT * FROM users WHERE userid=$1;`;

const getUserInfoUsingAdharcardQuery=`SELECT * FROM users WHERE adharcard=$1`;

const addActivityQuery = `INSERT INTO activity (activityName,distance,time,unit,userid,createdAt) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *;`;

const getUserActivityQuery = `SELECT * FROM activity WHERE activity.userid=$1`;

const deleteUserActivityQuery = `DELETE FROM activity WHERE activityid=$1`;

const setDashboardActivityStatusQuery = `UPDATE activity SET dashboardStatus=$1 WHERE activityid=$2 RETURNING *`;

// const getAllUsersIfActivityExistQuery=`SELECT DISTINCT username,activity.userid FROM activity JOIN users ON activity.userid=users.userid WHERE users.userid!=$1`;

const getAllUsersIfActivityExistQuery=`SELECT DISTINCT u.userid,u.username, c.acceptedrequest, c.senderid, c.connectionid,c.createdat
FROM users u
JOIN activity  a ON u.userid = a.userid
LEFT JOIN connections c ON (u.userid = c.senderid OR u.userid = c.connectionid) 
AND (c.senderid = $1  OR c.connectionid = $1 )
WHERE u.userid !=$1 `;

const addConnectionQuery=`INSERT INTO connections (senderid,connectionid,acceptedrequest,createdat) VALUES ($1,$2,$3,$4) RETURNING *;`

const deleteRequestQuery=`DELETE FROM connections WHERE senderid=$1 AND connectionid=$2 RETURNING *`;

const acceptRequestQuery=`UPDATE connections
SET acceptedrequest=$3
WHERE senderid=$1 AND connectionid=$2 RETURNING *;`

module.exports = {
  getUserInfoUsingEmailQuery,
  signupQuery,
  updateUserInfoQuery,
  getUserInfoUsingUseridQuery,
  addActivityQuery,
  getUserActivityQuery,
  deleteUserActivityQuery,
  setDashboardActivityStatusQuery,
  getUserInfoUsingAdharcardQuery,
  getAllUsersIfActivityExistQuery,
  addConnectionQuery,
  deleteRequestQuery,
  acceptRequestQuery
};
