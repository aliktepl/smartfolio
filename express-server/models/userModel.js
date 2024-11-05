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
    const result = await pool.query('SELECT * FROM users');
    return result.rows; // Return an array of user objects
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0]; // Return a single user object
  }
  static async findWalletById(id) {
  

  try {
    console.log("model-id:",id)
    const result = await pool.query('SELECT * FROM wallets;');
    delete result.rows.id
    const final = result.rows
    console.log("model2:" ,final)
    return final;
  } catch (error) {
    console.error('Error executing query', error.stack);
  }
}

  // Additional methods (create, update, delete) can be added here
}

module.exports = User;
