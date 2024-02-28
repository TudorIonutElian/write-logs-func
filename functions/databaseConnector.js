const mysql2 = require('mysql2');

function connectToDatabase() {
    return mysql2.createConnection({
        host: process.env.rds_instance_endpoint,
        user: process.env.rds_instance_username,
        password: process.env.rds_instance_password,
    });
}

function runQuery(query) {
    const connection = connectToDatabase();
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { connectToDatabase, runQuery };