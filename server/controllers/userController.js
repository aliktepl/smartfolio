const userService = require('../services/userService');


exports.getUser= async (req, res) => {
  try {
    const username = req.user.displayName
    res.status(200).json(username);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user information' });
  }
};

