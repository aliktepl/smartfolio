const pool = require('../config/db');

class Article{

    static async getTop(coin){
        try {
            // Get all rows from articles where id = 'btc'
            return await pool`
            SELECT * 
            FROM articles
            WHERE coin = ${coin}
        `;
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
}
module.exports = Article