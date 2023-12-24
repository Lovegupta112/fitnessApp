const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const userRouter=require('./routes/user');
const port=process.env.PORT || 3000;
const auth=require('./middlewares/auth');
const protectedRouter=require('./routes/protected');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions={origin:process.env.ORIGIN_URL,credentials:true}
// const corsOptions={credentials:true}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/users',userRouter);
// app.use('/protected',auth,protectedRouter);
app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`);
});

