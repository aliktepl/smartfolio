// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        unique: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

module.exports = User;