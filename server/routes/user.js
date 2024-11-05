const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');
const {isLoggedIn} = require('../routes/auth')

// Route to handle wallet requests
router.get('/wallet', isLoggedIn ,userController.getWallet);

module.exports = router