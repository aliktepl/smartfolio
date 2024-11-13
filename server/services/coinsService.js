const coins = require('../models/coinsModel');

class CoinsService {
    static async getAllCoins(){
        return await coins.getAll()
    }
    static async getOneCoin(id){
        return await coins.getOne(id)
    }
}
module.exports = CoinsService