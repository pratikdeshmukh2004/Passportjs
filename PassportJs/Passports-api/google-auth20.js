const GoogleStrategy = require('passport-google-oauth20');

module.exports=(app,passport)=>{

    var data={}
    passport.use(new GoogleStrategy({
            clientID: '1082822337636-mudl9qsbg7b3te03s8hoqjpgc8op1o0v.apps.googleusercontent.com',
            clientSecret: 'V-DiuR_Hu78JzmeNSmpIuqLD',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log(profile._json);
            data["Name"]=profile.displayName
            data["Image"]=profile._json.picture
            done(null, profile);
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.send("<center><h1>Welcome To My Site "+data.Name+"</h1><img src="+data.Image+"></img></center>")
    });
    
}
