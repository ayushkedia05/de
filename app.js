const express =require('express');
const morgan=require('morgan');
const userRoutes =require('./routes/userroutes.js')
let cors=require("cors");
const cookieParser = require('cookie-parser');
const path=require('path');
const app=express();
app.use(cors());


const request=require('request');
const passport =require("passport")
const googleStrategy=require("passport-google-oauth20");
// const { access } = require('fs');


const session = require('express-session');
// After you declare "app"
app.use(session({ secret: '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' }));

//     // request.post('http://localhost:3000/api/users/',newprofile);
//   return done(null,profile);

// }))


// app.get("/auth/google",passport.authenticate("google",{
//     scope:["profile ","email"]
// }))


// app.get("/auth/google/callback",passport.authenticate("google"))






app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});





passport.use(new googleStrategy({
    clientID:"104402507206-vhno2nhlnq3rur6df7dt5euke5f85cu7.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3001/product",
},(accessToken,refreshToken,profile,done)=>{
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile.json)
    const newprofile={
        name:profile.displayName,
        email:profile.emails[0].value,
        photo:profile.photos[0].value
    }
    console.log(newprofile)
    request.post('http://localhost:3000/api/users/',newprofile);


 done(null,{});
}))


app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));




  const clientid="104402507206-vhno2nhlnq3rur6df7dt5euke5f85cu7.apps.googleusercontent.com";
  const clientsecret="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";


  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
  (req, res, next) => {
      console.log(req.user, req.isAuthenticated());
      res.send('user is logged in');
  })




app.get('/auth/fail', (req, res, next) => {
    res.send('user logged in failed');
});

app.get('/logout', (req, res, next) => {
    req.logout();
    res.send('user is logged out');
});



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