const ArticleService=  require('../services/articlesServices');
exports.getTopArticles = async (req, res) => {
    try {
        const articles = await ArticleService.getTopGeneralArticles()
        // Send the wallet data as a JSON response
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet information' });
    }
};
exports.getTopCoinArticles = async (req, res) => {
    try {
        const articles = await ArticleService.getTopCoinArticles(req.params.id)
        // Send the wallet data as a JSON response
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet information' });
    }
};