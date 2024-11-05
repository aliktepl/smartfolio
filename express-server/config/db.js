// const { Sequelize } = require('sequelize');

// // Create a new Sequelize instance for PostgreSQL
// const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
//   host: 'localhost',  // or cloud database host
//   dialect: 'postgres',  // for PostgreSQL; use 'mysql' for MySQL
// });

// module.exports = sequelize;


const { Pool } = require('pg');

const pool = new Pool({
  user: 'smartfolio',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});
pool.connect();

module.exports = pool;