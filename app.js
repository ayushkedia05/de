const express =require('express');
const morgan=require('morgan');
const userRoutes =require('./routes/userroutes.js')
let cors=require("cors");
const cookieParser = require('cookie-parser');
const path=require('path');
const app=express();
app.use(cors());


if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,'userlogin/build')))
    
    
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'userlogin','build','index.html'));
    })
    
}else {
    app.get("/",(req,res)=>{
        res.send("APi running");
    })
}



app.use(morgan('dev'));
app.use(cookieParser());




app.use(express.json());

app.use((req,res,next)=>{
    console.log('hello from the middlerware');
    next();
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

app.use('/api/users',userRoutes);

module.exports=app;