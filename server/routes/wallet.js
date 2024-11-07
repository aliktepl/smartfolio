const express = require("express")
const router = express.Router()
const walletController = require('../controllers/walletController');
const {isLoggedIn} = require('../routes/auth')

// Get the user's wallet
router.get('/', isLoggedIn ,walletController.getWallet);
// router.post('/:id',isLoggedIn,walletController)

module.exports = router;