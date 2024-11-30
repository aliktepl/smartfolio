
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



    static async findById(id) {
        // const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        // return result.rows[0]; // Return a single user object
    }

}

module.exports = User;