const coins = require('../models/coinsModel');

class CoinsService {
    static async getAllCoins(){

        const res =  await coins.getAll()
        return res
    }
    static async getOneCoin(id){
        const res = await coins.getOne(id)
        return res
    }
}
module.exports = CoinsService