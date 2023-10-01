import GithubStrategy from 'passport-github2';
import passport from "passport";

import "dotenv/config";



const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
        //  console.log("hello");
        // User.findOrCreate({ accountId: profile.id, provider: 'github' }, function (err, user) {

      console.log(profile);
      return cb(null, profile);
        // });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});