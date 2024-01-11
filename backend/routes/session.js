const express=require('express');
const router=express.Router();
const sessionController=require('../controllers/sessionController');

router.post('/bookSession',sessionController.bookSession);
router.get('/fetchSessions',sessionController.fetchSessions);
module.exports=router;