const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');
const {isLoggedIn} = require('../routes/auth')

// Get the user's wallet
router.get('/', isLoggedIn ,userController.getWallet);

module.exports = router;