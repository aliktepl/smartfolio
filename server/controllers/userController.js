const userService = require('../services/userService');

exports.getWallet = async (req, res) => {
  try {
    //TODO - get the right user id here:
    const userId = 1
    // Assuming the user ID is available in the request (from authentication)
    // Call the service to get wallet information
    const walletData = await userService.getUserWallet(userId);
    // Send the wallet data as a JSON response
    res.status(200).json(walletData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving wallet information' });
  }
};

// controllers/userController.js
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Get users from the service
    res.json(users); // Send users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
