module.exports=(app,passport)=>{
    var FacebookStrategy = require('passport-facebook').Strategy;
    var data={};
    passport.use(new FacebookStrategy({
        clientID: "2237545999868672",
        clientSecret: "6746306e3816d15285c8396bce156957",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        data["Name"]=profile.displayName
        data["Image"]=profile.photos[0].value
        process.nextTick(function () {
            return done(null, profile);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    

    app.get('/auth/facebook',
    passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {

        res.send("<center><h1>Welcome To My Site "+data.Name+"</h1><img src="+data.Image+"></img></center>")
    });
}