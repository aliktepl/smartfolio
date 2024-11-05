const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require("dotenv");
dotenv.config();

// Set up Passport Google Strategy
passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            // Here you would find or create a user in the database
            done(null, profile);
        })
);

// Serialize and deserialize user information for session handling
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});