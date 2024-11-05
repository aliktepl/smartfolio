const { Sequelize } = require('sequelize');

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize('smartfolio', 'aliktepl', '1234', {
  host: 'localhost:5432',  // or cloud database host
  dialect: 'postgres',  // for PostgreSQL; use 'mysql' for MySQL
});

module.exports = sequelize;