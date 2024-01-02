
const validateActivitySchema=(schema)=>{
    return (req,res,next)=>{
        try{
         console.log('request Body: ',req.body);
         console.log("activity Request: ", req.userid);
         const { activityName, distance, time, unit,createdAt } = req.body;
         const userid=req.userid;
         const data=schema.validate({activityName,distance,time,unit,createdAt,userid});
         console.log('data: ',data);
         const {error}=data;
         if (error) {
            const message = error.details.map(data => data.message);
           return res.status(400).json({
              status: "error",
              message: "Invalid request data",
              data: message
            });
        }
        next();
        }
        catch(error){
            console.log('Validation Error: ',error);
            return res.status(422).json({error:error});
        }
    }
}



module.exports=validateActivitySchema;