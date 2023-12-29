const Joi=require('joi');

const validateSchema=(schema)=>{
return (req,res,next)=>{
    try{
        console.log('request: ',req.body);
    const data=schema.validate(req.body);
    console.log('data: ',data);
    const {error}=data;
    console.log('error: ',error);
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

module.exports=validateSchema;