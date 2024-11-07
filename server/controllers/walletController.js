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