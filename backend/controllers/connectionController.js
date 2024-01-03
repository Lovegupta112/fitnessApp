const {query}=require('../config/db');
const {addConnectionQuery,deleteRequestQuery, acceptRequestQuery}=require('../util/queries');


const addConnection=async (req,res)=>{
    try{
        const {connectionid,senderid,acceptedrequest,createdat}=req.body;
        // const senderid=req.userid;

        // console.log('hello: ');
        const newConnectionRequest=await query(addConnectionQuery,[senderid,connectionid,acceptedrequest,createdat]);

        console.log('Succesfully requested connection',newConnectionRequest.rows[0]);
        res.status(200).json(newConnectionRequest.rows[0]);
    }
    catch(error){
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
}


// const fetchRequestsUsingUserid=async (req,res)=>{
//     try{
//     const userid=req.userid;
//     const requests=await query(`SELECT c.senderid ,c.connectionid ,u.username,c.acceptedrequest
//     FROM connections c 
//     LEFT JOIN users u
//     ON c.senderid=u.userid 
//     WHERE c.connectionid=$1 and  c.acceptedrequest=false`,[userid]);
//     console.log('Successfully fetched requests !');
//     res.status(200).json(requests.rows);
//     }
//     catch(error){
//         console.log("Error: ", error);
//         res.status(500).json({ message: error.message });
//     }
// }

const deleteRequest=async(req,res)=>{
    try{
     const userid=req.userid;
     const [connectionid,senderid]=req.params.connectionid.split('-');
    //  console.log(userid,senderid,connectionid);
      const deleteRequest=await query(deleteRequestQuery,[senderid,connectionid]);
     console.log('Successfully Deleted request !',deleteRequest.rows[0]);
     res.status(200).json({message:'Successfully Removed Connection!',user:deleteRequest.rows[0]});
    }
    catch(error){
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
}

const acceptRequest=async(req,res)=>{
    try{
        const {connectionid,senderid,acceptedRequest}=req.body;
        // const userid=req.userid;
        // const  connectionid=req.params.connectionid;
        // const status=req.body?.status;
       const acceptRequest= await query(acceptRequestQuery,[senderid,connectionid,acceptedRequest]);
        res.status(200).json(acceptRequest.rows[0]);
    }
    catch(error){
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
}


module.exports={addConnection,deleteRequest,acceptRequest};