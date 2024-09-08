const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const userRouter=require('./routes/user');
const port=process.env.PORT || 3000;
const auth=require('./middlewares/auth');
// const protectedRouter=require('./routes/protected');
const activityRouter=require('./routes/activity');
const connectionRouter=require('./routes/connection');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions={origin:process.env.ORIGIN_URL,credentials:true}
// const corsOptions={credentials:true}
// app.use(cors(corsOptions));
// app.use(cors());
app.options("*",cors())//Enable CORS for all preflight requests
app.use(cookieParser());

app.get('/health',(req,res)=>res.status(200).send('Server is Healthy.'));
app.use('/users',userRouter);
app.use('/activity',auth,activityRouter);
app.use('/connection',auth,connectionRouter);
// app.use('/protected',auth,protectedRouter);
app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`);
});

