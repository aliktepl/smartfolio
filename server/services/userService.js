
// const User = require('../models/userModel');  // The User model to interact with the database

// exports.getUserWallet = async (userId) => {
//   // Fetch the user’s wallet data from the database
//   const user = await User.findByPk(userId, { attributes: ['wallet'] });
  
//   if (!user) {
//     throw new Error('User not found');
//   }

//   // Returning the wallet information
//   return user.wallet;  // Assuming wallet is an object with balance and coin information
// };


// services/userService.js
const User = require('../models/userModel');

class UserService {
  static async getAllUsers() {
    return await User.findAll(); // Calls the model method to fetch all users
  }
  static async getUserWallet() {
    return await User.findWalletById(1); // Calls the model method to fetch all users
  }

  // Additional service methods can be added here
}

module.exports = UserService;

// exports.getUserWallet = async (userId) => {

//   const walletData = [
//     { name: "Bitcoin",symbol: "BTC" , amount: 11 , change: 0.25 },
//     { name: "Ethereum",symbol: "ETH" , amount: 4 , change: 0.30 },
//     { name: "Cardano",symbol: "CAR" , amount: 1 , change: 0.10 },
//     { name: "DogeCoin",symbol: "DOG" , amount: 9 , change: 0.90 }
//   ]
//   return walletData

// }

