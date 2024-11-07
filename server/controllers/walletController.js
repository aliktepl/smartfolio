const walletService = require("../services/walletService");
exports.getWallet = async (req, res) => {
    try {

        const userId = req.user.id
        // Assuming the user ID is available in the request (from authentication)
        // Call the service to get wallet information
        const walletData = await walletService.getUserWallet(userId);
        // Send the wallet data as a JSON response
        res.status(200).json(walletData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet information' });
    }
};
exports.addCoin = async (req,res) =>{
    try {
        const userId = req.user.id; // Assuming the user ID is available from authentication
        const amount = req.body.amount; // Get the amount from the request body
        const coinId= req.params.id
        await walletService.postCoinToWallet(userId,coinId,amount)
        // Send the wallet data as a JSON response
        res.status(200)
    } catch (error) {
        res.status(500).json({ message: 'Error adding coin to wallet' });
    }
}
exports.removeCoin = async (req,res) =>{
    try {
        const userId = req.user.id
        const coinId = req.params.id
        await walletService.removeCoinFromWallet(userId,coinId)
        res.status(200)
    }    catch (error) {
        res.status(500).json({ message: 'Error removing coin from wallet' });
    }
}
exports.updateCoinAmount = async (req,res) =>{
    try {
        const userId = req.user.id
        const coinId = req.params.id
        const amount = req.body.amount; // Get the amount from the request body
        await walletService.updateCoinAmount(userId,coinId,amount)
        res.status(200)
    }    catch (error) {
        res.status(500).json({ message: 'Error removing coin from wallet' });
    }
}
