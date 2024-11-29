


// services/userService.js
const User = require('../models/userModel');


class UserService {

  // static async getUserWallet(userID) {
  //   return await User.findWalletById(userID); // Calls the model method to fetch all users
  // }
  static async addUser(profile){
    const id  = profile.id
    const name  = profile.displayName

    const res =  await User.add(id,name)
    console.log('res: ', res)
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

