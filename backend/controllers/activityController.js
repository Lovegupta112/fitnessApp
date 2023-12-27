const { query } = require("../config/db");

const addUserActivity = async (req, res) => {
  try {
    const { activityName, distance, time, unit } = req.body;
    console.log("activity Request: ", req.userid);
    // console.log('body',data);
    const newActivity = await query(
      `INSERT INTO activity (activityName,distance,time,unit,userid) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [activityName, distance, time, unit, req.userid]
    );

    console.log("SuccessFully Created: ", newActivity.rows[0]);
    res.status(201).json({ message: "Activity Created !" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserActivity = async (req, res) => {
  try {
    const userid = req.userid;
    const activity = await query(
      `SELECT * FROM activity WHERE activity.userid=$1`,
      [userid]
    );
    console.log("userActivity: ", activity.rows[0]);
    res.status(200).json(activity.rows);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUserActivity=async(req,res)=>{
  try{
     const activityid=req.params.activityid;
     console.log('activityid: ',activityid);
     if(!activityid){
      return res.status(400).json({message:'activityId are required !'});
     }
     await query(`DELETE FROM activity WHERE activityid=${activityid}`);
     
     res.status(200).json({message:`Activity with id ${activityid} has deleted !`});
  }
  catch(error){
    console.log('Error: ',error);
    res.status(500).json({message:error.message});
  }
}
module.exports = { addUserActivity, getUserActivity ,deleteUserActivity};
