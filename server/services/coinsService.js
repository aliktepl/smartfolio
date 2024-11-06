const coins = require('../models/coinsModel');

class CoinsService {
    static async getAllCoins(){

        const res =  await coins.getAll()
        return res
    }
}
module.exports = CoinsService