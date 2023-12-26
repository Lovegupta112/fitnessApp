const express=require('express');
const router=express.Router();
const activityController=require('../controllers/activityController');


router.post('/save',activityController.addUserActivity);
router.get('/getActivities',activityController.getUserActivity);
module.exports=router;