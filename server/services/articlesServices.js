const Article = require('../models/articlesModel');



class ArticleService{
    static async getTopCoinArticles(coin){
        return await Article.getTop(coin)
    }
    static async getTopGeneralArticles(){
        return await Article.getTop("CRYPTO")
    }
}
module.exports = ArticleService