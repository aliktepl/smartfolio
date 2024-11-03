const { Sequelize } = require('sequelize');

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',  // or cloud database host
  dialect: 'postgres',  // for PostgreSQL; use 'mysql' for MySQL
});

module.exports = sequelize;