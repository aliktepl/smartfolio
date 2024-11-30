const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController.js');
const coinsController = require('../controllers/coinsContorller.js');

const {isLoggedIn} = require('../routes/auth')

//Get all coins
router.get('/', isLoggedIn,coinsController.getAllCoins);

router.get('/:id', isLoggedIn, coinsController.getCoin);

module.exports = router;