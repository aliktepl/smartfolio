const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport')

const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
}

const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect(`http://localhost:5174`);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
});

module.exports = {router, isLoggedIn}
