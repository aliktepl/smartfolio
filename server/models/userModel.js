// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// // Define the User model
// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   // Assuming wallet is a JSON column that stores balance and coin information
//   wallet: {
//     type: DataTypes.JSON,
//     allowNull: true,
//   }
// }, {
//   tableName: 'users',
// });

// module.exports = User;

// models/userModel.js
const pool = require('../config/db');

class User {
    static async findAll() {
        // const result = await pool.query('SELECT * FROM users');
        // return result.rows; // Return an array of user objects
    }
    static async isExist(id,name){

        // return await pool.query('SELECT EXISTS (SELECT 1 FROM users WHERE id = ', id ,');')
    }
    static async add(userId,userName){
        try {
            // Insert user with `ON CONFLICT DO NOTHING`
            await pool`
            INSERT INTO users (id, name)
            VALUES (${userId}, ${userName})
            ON CONFLICT (id) DO NOTHING
        `;

            console.log('User added if not existing.');
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }


    // static async add(id, name) {
    //     // Construct the query using `squel`
    //     const insertQuery = squel.insert()
    //         .into('users')
    //         .set('id', id)
    //         .set('name', name)
    //         .toString() + ' ON CONFLICT (id) DO NOTHING';
    //
    //     // Execute the query
    //     try {
    //         await pool.query(insertQuery);
    //         console.log('User added if not existing.');
    //     } catch (error) {
    //         console.error('Error executing query:', error);
    //     }
    // }


    static async findById(id) {
        // const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        // return result.rows[0]; // Return a single user object
    }
    // static async findWalletById(id) {
    //
    //
    //     try {
    //         const result = await pool.query('SELECT * FROM wallets;');
    //         delete result.rows.id
    //         const final = result.rows
    //         return final;
    //     } catch (error) {
    //         console.error('Error executing query', error.stack);
    //     }
    // }
    // static async findWalletById(id) {
    //     try {
    //         // Query wallets table for all rows where id matches
    //         const result = await pool`
    //             SELECT c.name, c.symbol, c.change, w.amount
    //             FROM wallets w
    //             JOIN coins c ON w.coin_id = c.id
    //             WHERE w.user_id = ${id}
    //         `;
    //         //
    //         // // Remove `id` from each result row if needed
    //         // const final = result.map(row => {
    //         //     const { id, ...rest } = row;
    //         //     return rest;
    //         // });
    //
    //         return result;
    //     } catch (error) {
    //         console.error('Error executing query', error);
    //     }
    // }

    // Additional methods (create, update, delete) can be added here
}

module.exports = User;