const express=require('express');
const router=express.Router();
const connectionController=require('../controllers/connectionController');
const connectionSchema=require('../models/connectionSchema');
const validateSchema=require('../middlewares/schemaValidator');

router.post('/addConnection',validateSchema(connectionSchema.connectionSchema),connectionController.addConnection);
router.delete('/deleteRequest/:connectionid',connectionController.deleteRequest);
router.patch('/acceptRequest',validateSchema(connectionSchema.acceptRequestSchema),connectionController.acceptRequest);

module.exports=router;