const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: { fullName: profile.displayName },
      });
      cb(null, user);
    },
  ),
);
