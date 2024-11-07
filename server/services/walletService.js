const wallet = require("../models/walletModel");

class WalletService{
    static async getUserWallet(userID) {
        return await wallet.findWalletById(userID); // Calls the model method to fetch all users
    }
    static async postCoinToWallet(userId,coinId,amount){
        await wallet.addCoin(userId,coinId,amount)
    }
    static async removeCoinFromWallet(userId,coinId){
        await wallet.removeCoin(userId,coinId)
    }
    static async updateCoinAmount(userId,coinId,amount){
        await wallet.updateCoinAmount(userId,coinId,amount)
    }
}
module.exports = WalletService
