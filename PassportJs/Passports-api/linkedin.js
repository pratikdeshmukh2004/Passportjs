module.exports=(app,passport)=>{
    var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
    var data={};
    passport.use(new LinkedInStrategy({
        clientID: "81iwnitjdbvea8",
        clientSecret: "wk3JIweZ5B93sXUu",
        callbackURL: "http://localhost:3000/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
    },
    (accessToken, refreshToken, profile, done)=>{
        // console.log(profile)
        data["Name"]=profile.displayName
        data["Image"]=profile.photos[0].value
        process.nextTick(function () {
            return done(null, profile);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    

    app.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: 'SOME STATE'  }),
    function(req, res){
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {

        res.send("<center><h1>Welcome To My Site "+data.Name+"</h1><img src="+data.Image+"></img></center>")
    });
}