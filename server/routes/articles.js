const express = require("express")
const router = express.Router()
const articlesController = require('../controllers/articlesController');
const {isLoggedIn} = require('../routes/auth')



router.get('/', isLoggedIn,articlesController.getTopArticles);
router.get('/:id', isLoggedIn,articlesController.getTopCoinArticles );
module.exports = router;