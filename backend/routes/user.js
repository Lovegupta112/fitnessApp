const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const auth=require('../middlewares/auth');
const validateSchema=require('../middlewares/schemaValidator');
const userSchema=require('../models/userSchema');

router.post('/signup',validateSchema(userSchema.signupSchema),userController.signup);
router.post('/login',validateSchema(userSchema.loginSchema),userController.login)
router.put('/updateInfo',validateSchema(userSchema.userUpdationSchema),userController.updateUserInfo);
router.get('/logout',userController.logout);
router.get('/userInfo',auth,userController.getUserInfo);
module.exports=router;