const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const userRouter=require('./routes/user');
const port=process.env.PORT || 3000;
const auth=require('./middlewares/auth');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
// app.use(auth);


app.use('/users',userRouter);
app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`);
});

