const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/commentController.js');
const { isLoggedIn } = require('../routes/auth');

// Route to get comments by coin
router.get('/:id', isLoggedIn, commentsController.getCommentsByCoin);

module.exports = router;
