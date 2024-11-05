const pool = require('../config/db');

exports.getData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table'); // Replace 'your_table' with the actual table name
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
