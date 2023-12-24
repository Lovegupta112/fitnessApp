const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.json({message:'Access granted for this route!',userId:req.userid});
})
module.exports=router;