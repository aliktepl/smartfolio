const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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