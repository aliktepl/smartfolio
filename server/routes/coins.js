const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');
const coinsController = require('../controllers/coinsContorller.js');

const {isLoggedIn} = require('../routes/auth')

//Get all coins
router.get('/', isLoggedIn,coinsController.getAllCoins);

//todo - Get a single coin by id
router.get('/:id', isLoggedIn, userController.getWallet);

module.exports = router;