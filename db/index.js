const { Client } = require('pg');
//imports postgreSQL model

const client = new Client('postgres://localhost:5432/juicebox-dev-2');
//supply the db name and location of the database



async function getAllUsers() {
    const { rows } = await client.query(`
    SELECT id, username
    FROM users;
    `);

    return rows;
};

async function createUser({ username, password }) {
    try {
        const { rows } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);

        return rows;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    client,
    getAllUsers,
    createUser,
};