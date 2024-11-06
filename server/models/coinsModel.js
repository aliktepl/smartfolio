const pool = require('../config/db');
class Coins {
    static async getAll(){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            const coins = await pool`
            select  name, symbol, change, sentiment
            from coins
        `;

            console.log('got the coins');
            return coins
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
}
module.exports = Coins;