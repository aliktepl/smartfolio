const pool = require('../config/db');

class Comment {
    static async getTop(coin) {
        try {
            // Get all rows from comments where coin matches the provided value
            return await pool`
            SELECT * 
            FROM comments
            WHERE coin = ${coin}
        `;
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
}

module.exports = Comment;