
const User = require('../models/userModel');  // The User model to interact with the database

// exports.getUserWallet = async (userId) => {
//   // Fetch the user’s wallet data from the database
//   const user = await User.findByPk(userId, { attributes: ['wallet'] });
  
//   if (!user) {
//     throw new Error('User not found');
//   }

//   // Returning the wallet information
//   return user.wallet;  // Assuming wallet is an object with balance and coin information
// };

exports.getUserWallet = async (userId) => {

  const walletData = [
    { name: "Bitcoin",symbol: "BTC" , amount: 12 , change: 0.25 },
    { name: "Ethereum",symbol: "ETH" , amount: 4 , change: 0.30 },
    { name: "Cardano",symbol: "CAR" , amount: 1 , change: 0.10 },
    { name: "DogeCoin",symbol: "DOG" , amount: 9 , change: 0.90 },
    { name: "Solana", symbol: "SOL", amount: 100, change: 0.35 },
  ]
  return walletData

}

