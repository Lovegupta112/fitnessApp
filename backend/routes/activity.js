const express=require('express');
const router=express.Router();
const activityController=require('../controllers/activityController');
const validateActivitySchema=require('../middlewares/activityValidator');
const validateSchema=require('../middlewares/schemaValidator');
const activitySchema=require('../models/activitySchema');

router.post('/save',validateActivitySchema(activitySchema.activitySchema),activityController.addUserActivity);
router.get('/getActivities',activityController.getUserActivity);
router.delete('/deleteActivity/:activityid',activityController.deleteUserActivity);
router.patch('/updateDashboardStatus',validateSchema(activitySchema.dashboardActivitySchema),activityController.setDashboardActivityStatus);
module.exports=router;