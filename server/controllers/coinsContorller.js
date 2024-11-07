const coinsService = require('../services/coinsService');
exports.getAllCoins = async (req, res) => {
    try {
        const coins = await coinsService.getAllCoins()
        // Send the wallet data as a JSON response
        res.status(200).json(coins);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet information' });
    }
};
exports.getCoin = async (req,res) =>{
    try {
        const coin = await coinsService.getOneCoin(req.params.id)
        // Send the wallet data as a JSON response
        res.status(200).json(coin);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet information' });
    }
};
