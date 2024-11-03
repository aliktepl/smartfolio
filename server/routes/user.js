const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');

// Route to handle wallet requests
router.get('/wallet', userController.getWallet);

module.exports = router