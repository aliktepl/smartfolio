



const pool = require("../config/db");

class Wallet{
    static async findWalletById(id) {
        try {
            // Query wallets table for all rows where id matches
            const result = await pool`
                SELECT c.name, c.symbol, c.change, w.amount
                FROM wallets w
                JOIN coins c ON w.coin_id = c.id
                WHERE w.user_id = ${id}
            `;
            //
            // // Remove `id` from each result row if needed
            // const final = result.map(row => {
            //     const { id, ...rest } = row;
            //     return rest;
            // });

            return result;
        } catch (error) {
            console.error('Error executing query', error);
        }
    }
    static async addCoin(userId,coinId,amount){
        try {
            // Query wallets table for all rows where id matches
            const result = await pool`
                INSERT INTO wallets (user_id, coin_id, amount)
                VALUES (${userId}, ${coinId}, ${amount});
            `;

            return result;
        } catch (error) {
            console.error('Error executing query', error);
        }
    }
}
module.exports = Wallet