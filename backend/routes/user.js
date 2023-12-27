const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const auth=require('../middlewares/auth');

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.put('/updateInfo',userController.updateUserInfo);
router.get('/logout',userController.logout);
router.get('/userInfo',auth,userController.getUserInfo);
module.exports=router;