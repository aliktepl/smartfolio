const pool = require('../config/db');
class Coins {
    static async getAll(){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            return await pool`
            SELECT name, symbol, sentiment, tech_info
            FROM coins
            ORDER BY popularity DESC
        `
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
    static async getOne(id){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            return await pool`
            select  name, symbol, sentiment, tech_info,graph
            from coins
            where id = ${id}
        `
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }

}
module.exports = Coins;