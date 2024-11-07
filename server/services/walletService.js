const wallet = require("../models/walletModel");

class WalletService{
    static async getUserWallet(userID) {
        return await wallet.findWalletById(userID); // Calls the model method to fetch all users
    }
}
module.exports = WalletService
