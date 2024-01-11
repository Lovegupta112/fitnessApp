const {query}=require('../config/db');

const bookSession=async (req,res)=>{
    try{
     const {sessionDate,sessionTime}=req.body;
     const userid=req.userid;
     const newSession=await query(`INSERT INTO sessions (session_date,session_time,userid) VALUES ($1,$2,$3) RETURNING *; `,[sessionDate,sessionTime,userid]);
     console.log('SuccessFully booked session: ',newSession.rows[0]);
     res.status(201).json({message:'Session Booked '});
    }
    catch(error){
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
}
const fetchSessions=async (req,res)=>{
    try{
     const userid=req.userid;
     const sessions=await query(`SELECT * FROM sessions WHERE userid=$1`,[userid]);
     console.log('SuccessFully fetched sessions');
     res.status(200).json(sessions.rows);
    }
    catch(error){
        console.log('Error: ',error);
        res.status(500).json({message:error.message});
    }
}
const deleteSession=async (req,res)=>{
    
}

module.exports={
    bookSession,
    fetchSessions
};