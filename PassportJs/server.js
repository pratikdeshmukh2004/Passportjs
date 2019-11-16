const express = require('express');
const app = express();
const passport = require('passport');
app.use(passport.initialize());


var google_auth20=express.Router()
app.use("/",google_auth20);
require("./Passports-api/google-auth20")(google_auth20,passport)

var linkdin=express.Router()
app.use("/",linkdin);
require("./Passports-api/linkedin")(linkdin,passport)

var facebook=express.Router()
app.use("/",facebook);
require("./Passports-api/facebook")(facebook,passport)

// var github=express.Router()
// app.use("/",github);
// require("./Passports-api/github")(github,passport)








app.get("/",(req,res)=>{
    res.send("<center><h1>This Url Not Found...</h1><a href='https://www.google.com/'>Go back...</a>")
})
app.get("/:name",(req,res)=>{
    res.send("<center><h1>This Url Not Found...</h1><a href='https://www.google.com/'>Go back...</a>")
})
app.get("/auth/:other",(req,res)=>{
    res.send("<center><h1>This Url Not Found...</h1><a href='https://www.google.com/'>Go back...</a>")
})

app.listen(3000, () => {
    console.log('Your server listening on http://localhost:3000/');
});