const express = require('express');
const passport = require('passport');
require('../config/passport')

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    req.isAuthenticated() ? next() : res.sendStatus(401);
}

const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login'
}), (req, res) => {
    res.redirect(`http://localhost:5173`);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send(err);
            }
            // Clear the cookie
            res.clearCookie('connect.sid'); // Adjust the cookie name if needed
            res.sendStatus(200);
        });
    });
});

module.exports = {router, isLoggedIn}
