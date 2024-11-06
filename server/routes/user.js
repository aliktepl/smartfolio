const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');
const {isLoggedIn} = require('../routes/auth')

//Get the user

router.get('/', isLoggedIn, userController.getUser);

module.exports = router