const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController');

// // Route to handle wallet requests
// router.get('/wallet', userController.getWallet);


// Simulate wallet data
router.get("/wallet", (req, res) => {
    //console.log("here")
    const walletData = [
      { name: "Bitcoin",symbol: "BTC" , amount: 8 , change: 0.25 },
      { name: "Ethereum",symbol: "ETH" , amount: 4 , change: 0.30 },
      { name: "Cardano",symbol: "CAR" , amount: 1 , change: 0.10 },
      { name: "DogeCoin",symbol: "DOG" , amount: 9 , change: 0.90 }
    ];
    res.json(walletData);
  }); 
module.exports = router