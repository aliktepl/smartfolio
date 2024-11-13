const pool = require('../config/db');
class Coins {
    static async getAll(){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            return await pool`
            select  name, symbol, change, sentiment
            from coins
        `
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
    static async getOne(id){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            return await pool`
            select  name, symbol, change, sentiment
            from coins
            where id = ${id}
        `
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }

}
module.exports = Coins;